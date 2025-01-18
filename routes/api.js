// Import required dependencies
const express = require('express');
const router = express.Router();

// Import route modules for users and thoughts
const userRoutes = require('./user');
const thoughtRoutes = require('./thought');

// Mount routes at their respective paths
// All user-related routes will be prefixed with /api/users
router.use('/users', userRoutes);

// All thought-related routes will be prefixed with /api/thoughts
router.use('/thoughts', thoughtRoutes);

module.exports = router;
