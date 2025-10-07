# Deployment Guide

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Keshavjulka/2310993858_ToDoApp-Node-.git
   cd 2310993858_ToDoApp-Node-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   npm start
   # or for development with auto-restart
   npm run dev
   ```

4. **Access the application**
   - Open your browser and go to `http://localhost:3000`
   - Sign up for a new account or use the existing test account:
     - Username: `Keshav`
     - Password: `123456`

## Features Included

✅ **User Authentication**
- Complete signup and login system
- Session-based authentication
- Secure password handling

✅ **Todo Management**
- Create new tasks
- Mark tasks as complete/incomplete
- Delete tasks
- View only your own tasks

✅ **Responsive Design**
- Works on desktop and mobile
- Clean, modern interface
- Intuitive user experience

✅ **Data Persistence**
- User data stored in JSON files
- Tasks linked to specific users
- Persistent sessions

## Sample Data

The application comes with sample data:
- **Test User**: Keshav (password: 123456)
- **Sample Tasks**: Backend Assignment (completed), Java Assignment (completed)

## API Endpoints

- `POST /api/signup` - Register new user
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Repository Structure

```
├── server.js          # Main Node.js server
├── package.json       # Dependencies and scripts
├── data/
│   ├── users.json     # User data
│   └── tasks.json     # Task data
├── public/
│   ├── login.html     # Login page
│   ├── signup.html    # Registration page
│   └── dashboard.html # Todo dashboard
└── README.md          # Documentation
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Session Management**: Express-session
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Data Storage**: JSON files
- **Unique IDs**: UUID library

## Security Features

- Session-based authentication
- User data isolation
- Input validation
- CSRF protection

## Future Enhancements

- Password hashing with bcrypt
- Database integration (MongoDB/PostgreSQL)
- Email verification
- Password reset functionality
- Real-time updates with WebSockets
- Task categories and priorities
- Due dates and reminders