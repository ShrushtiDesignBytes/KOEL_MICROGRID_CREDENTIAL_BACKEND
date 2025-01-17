const express = require('express');
const { getUser, createUser, loginUser, userRedirect } = require('./user_controller');
const  authenticateToken  = require('../../middleware/token');
const router = express.Router();

// Get all users
router.get('/user', getUser);

// Register a user
router.post('/register', createUser);

// Login a user
router.post('/login', loginUser);

// Redirect site
router.post('/redirect', authenticateToken,  userRedirect);

module.exports = router;
