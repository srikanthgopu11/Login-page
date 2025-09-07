// backend/src/index.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your React frontend
    credentials: true // Allow cookies to be sent
}));
app.use(express.json()); // For parsing application/json
app.use(cookieParser()); // For parsing cookies

// Routes
app.use('/api/auth', authRoutes);

// Simple root route
app.get('/', (req, res) => {
    res.send('Welcome to the Authentication Backend!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});