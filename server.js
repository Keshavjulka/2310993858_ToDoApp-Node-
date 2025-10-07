const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
    secret: 'todo-app-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Helper functions to read/write JSON files
const readUsersFile = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'data', 'users.json'), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeUsersFile = (users) => {
    fs.writeFileSync(path.join(__dirname, 'data', 'users.json'), JSON.stringify(users, null, 2));
};

const readTasksFile = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'data', 'tasks.json'), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeTasksFile = (tasks) => {
    fs.writeFileSync(path.join(__dirname, 'data', 'tasks.json'), JSON.stringify(tasks, null, 2));
};

// Authentication middleware
const requireAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ error: 'Authentication required' });
    }
};

// Routes

// Serve login page
app.get('/', (req, res) => {
    if (req.session.userId) {
        res.redirect('/dashboard');
    } else {
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    }
});

// Serve signup page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Serve dashboard page
app.get('/dashboard', (req, res) => {
    if (req.session.userId) {
        res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
    } else {
        res.redirect('/');
    }
});

// User registration
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    
    const users = readUsersFile();
    
    // Check if user already exists
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    
    // Create new user
    const newUser = {
        id: uuidv4(),
        username,
        password // In a real app, you should hash this password
    };
    
    users.push(newUser);
    writeUsersFile(users);
    
    res.json({ message: 'User created successfully', userId: newUser.id });
});

// User login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    
    const users = readUsersFile();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    req.session.userId = user.id;
    req.session.username = user.username;
    
    res.json({ message: 'Login successful', userId: user.id, username: user.username });
});

// User logout
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Could not log out' });
        }
        res.json({ message: 'Logout successful' });
    });
});

// Get current user info
app.get('/api/user', requireAuth, (req, res) => {
    res.json({ userId: req.session.userId, username: req.session.username });
});

// Get user's tasks
app.get('/api/tasks', requireAuth, (req, res) => {
    const tasks = readTasksFile();
    const userTasks = tasks.filter(task => task.userId === req.session.userId);
    res.json(userTasks);
});

// Create new task
app.post('/api/tasks', requireAuth, (req, res) => {
    const { title } = req.body;
    
    if (!title) {
        return res.status(400).json({ error: 'Task title is required' });
    }
    
    const tasks = readTasksFile();
    const newTask = {
        id: uuidv4(),
        userId: req.session.userId,
        title,
        status: 'pending'
    };
    
    tasks.push(newTask);
    writeTasksFile(tasks);
    
    res.json(newTask);
});

// Update task
app.put('/api/tasks/:id', requireAuth, (req, res) => {
    const taskId = req.params.id;
    const { title, status } = req.body;
    
    const tasks = readTasksFile();
    const taskIndex = tasks.findIndex(task => task.id === taskId && task.userId === req.session.userId);
    
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    if (title) tasks[taskIndex].title = title;
    if (status) tasks[taskIndex].status = status;
    
    writeTasksFile(tasks);
    
    res.json(tasks[taskIndex]);
});

// Delete task
app.delete('/api/tasks/:id', requireAuth, (req, res) => {
    const taskId = req.params.id;
    
    const tasks = readTasksFile();
    const filteredTasks = tasks.filter(task => !(task.id === taskId && task.userId === req.session.userId));
    
    if (filteredTasks.length === tasks.length) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    writeTasksFile(filteredTasks);
    
    res.json({ message: 'Task deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});