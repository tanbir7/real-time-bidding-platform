// routes/authRoutes.js
const express = require('express');
const { register, login, profile, resetPassword } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, profile);
router.post('/reset-password', resetPassword);

module.exports = router;