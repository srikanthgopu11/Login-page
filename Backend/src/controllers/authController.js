// backend/src/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const jwtSecret = process.env.JWT_SECRET || 'supersecretjwtkey'; // Use environment variable for secret

exports.register = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    User.create(email, password, (err, user) => {
        if (err) {
            console.error("Registration error:", err);
            return res.status(409).json({ message: err.message }); // 409 Conflict for duplicate email
        }
        res.status(201).json({ message: 'User registered successfully!' });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    User.findByEmail(email, (err, user) => {
        if (err) {
            console.error("Login error:", err);
            return res.status(500).json({ message: 'Internal server error.' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) {
                console.error("Password comparison error:", err);
                return res.status(500).json({ message: 'Internal server error.' });
            }
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }

            // User is authenticated, create a JWT
            const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });

            // Set the token as an HTTP-only cookie
            res.cookie('token', token, {
                httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
                sameSite: 'strict', // Protects against CSRF attacks
                maxAge: 3600000 // 1 hour
            });

            res.status(200).json({ message: 'Logged in successfully!', user: { id: user.id, email: user.email } });
        });
    });
};

exports.logout = (req, res) => {
    // Clear the token cookie
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.status(200).json({ message: 'Logged out successfully!' });
};

// Middleware to protect routes
exports.authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            // If token is expired or invalid, clear the cookie
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }
        req.user = user; // Attach user payload to the request
        next();
    });
};