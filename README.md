# Todo Application with User Authentication

A complete Todo application built with Node.js backend and vanilla HTML/CSS/JavaScript frontend, featuring user authentication and session management.

## Features

- **User Authentication**: Complete signup and login system
- **Session Management**: Secure session handling with Express sessions
- **Personal Todo Lists**: Each user can only see and manage their own tasks
- **Task Management**: Create, update, complete, and delete tasks
- **Responsive Design**: Works on desktop and mobile devices
- **Data Persistence**: User and task data stored in JSON files

## Project Structure

```
todo-app/
├── server.js              # Main Node.js server file
├── package.json            # Project dependencies and scripts
├── data/
│   ├── users.json         # User data storage
│   └── tasks.json         # Task data storage
└── public/
    ├── login.html         # Login page
    ├── signup.html        # Registration page
    └── dashboard.html     # Todo dashboard
```

## Installation

1. **Clone or download the project**
   ```bash
   cd "C:\Users\HP\OneDrive\Desktop\Assingment\todo-app"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   # For development (with auto-restart)
   npm run dev
   
   # For production
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Dependencies

- **express**: Web framework for Node.js
- **express-session**: Session middleware for Express
- **body-parser**: Parse incoming request bodies
- **uuid**: Generate unique IDs for users and tasks
- **nodemon**: Development dependency for auto-restarting server

## Usage

### 1. User Registration
- Visit `http://localhost:3000/signup`
- Enter a unique username and password
- Click "Sign Up" to create your account

### 2. User Login
- Visit `http://localhost:3000` (login page)
- Enter your credentials
- Click "Sign In" to access your dashboard

### 3. Managing Tasks
- **Add Task**: Enter task title and click "Add Task"
- **Complete Task**: Click "Complete" button to mark as done
- **Reopen Task**: Click "Reopen" to mark completed task as pending
- **Delete Task**: Click "Delete" to remove task permanently

### 4. Logout
- Click "Logout" button in the header to end your session

## Data Structure

### Users (users.json)
```json
[
  {
    "id": "unique-user-id",
    "username": "john_doe",
    "password": "user_password"
  }
]
```

### Tasks (tasks.json)
```json
[
  {
    "id": "unique-task-id",
    "userId": "user-id-who-owns-this-task",
    "title": "Complete the project",
    "status": "pending"
  }
]
```

## API Endpoints

### Authentication
- `POST /api/signup` - Register new user
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/user` - Get current user info

### Tasks
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Security Features

- Session-based authentication
- User isolation (users can only access their own data)
- Input validation
- CSRF protection through session management

## Notes

- **Password Security**: In a production environment, passwords should be hashed using bcrypt or similar
- **Database**: For production use, replace JSON file storage with a proper database (MongoDB, PostgreSQL, etc.)
- **Environment Variables**: Use environment variables for sensitive configuration
- **HTTPS**: Use HTTPS in production for secure data transmission

## Troubleshooting

1. **Port already in use**: Change the PORT variable in server.js
2. **Permission errors**: Ensure the application has write permissions to the data folder
3. **Session issues**: Clear browser cookies and restart the server

## Development

To modify the application:

1. **Backend changes**: Edit `server.js` and restart the server
2. **Frontend changes**: Edit HTML files in the `public` folder
3. **Styling**: Modify the CSS within the HTML files or extract to separate CSS files
4. **Data structure**: Modify the JSON file structures and update corresponding API endpoints