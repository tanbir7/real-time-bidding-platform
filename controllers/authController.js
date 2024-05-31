// controllers/authController.js
const AuthService = require('../services/authService');

exports.register = async (req, res) => {
    try {
         await AuthService.register(req.body);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const token = await AuthService.login(req.body);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.profile = async (req, res) => {
    try {
        const user = await AuthService.getUserById(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    // Password reset implementation
};
