const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Register route (No auth needed)
router.post('/register', registerUser);

// Login route (No auth needed)
router.post('/login', loginUser);

// Get user profile (Protected route)
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;
