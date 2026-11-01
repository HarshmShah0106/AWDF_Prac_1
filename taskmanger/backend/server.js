const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;
// Connect via Docker service name 'mongodb' inside container network, or localhost when running standalone
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/taskdb';

// Middleware
// 1. CORS enabled to permit requests from React development server (localhost:5173)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// 2. Request body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Logger middleware for API tracking
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/api/tasks', taskRoutes);

// Root / Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'Task Manager API (Practical 7 - Authentication & Middleware Pipeline) is running',
    endpoints: {
      register: 'POST /auth/register',
      login: 'POST /auth/login',
      getMe: 'GET /auth/me [Auth]',
      getAllTasks: 'GET /tasks [Auth]',
      getSingleTask: 'GET /tasks/:id [Auth]',
      createTask: 'POST /tasks [Auth + Validated]',
      updateTask: 'PUT /tasks/:id [Auth + Validated]',
      deleteTask: 'DELETE /tasks/:id [Auth]',
    },
  });
});

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: `Route ${req.originalUrl} not found on this server`,
  });
});

// Centralized error handler middleware as per Practical 7 specification
app.use(errorHandler);

// Connect to MongoDB & Start Server (Skip automatic listening in test environment for Supertest)
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log(' Successfully connected to MongoDB at:', MONGO_URI);
      app.listen(PORT, () => {
        console.log(` Server running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error(' MongoDB connection failure:', err.message);
      process.exit(1);
    });
}

module.exports = app;
