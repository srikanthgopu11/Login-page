// backend/src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Protected route example
router.get('/dashboard', authController.authenticateToken, (req, res) => {
    res.status(200).json({ message: `Welcome to the dashboard, ${req.user.email}!`, user: req.user });
});

router.get('/check-auth', authController.authenticateToken, (req, res) => {
    res.status(200).json({ isAuthenticated: true, user: req.user });
});


module.exports = router;