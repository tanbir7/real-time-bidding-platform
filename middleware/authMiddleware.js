// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config');

module.exports = async (req, res, next) => {
    const token = req.headers['authorization'];
  

    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
       
        const user = await User.findByPk(decoded.id);
      
        if (!user) throw new Error('User not found');
        req.user = user;
        next();
    } catch (error) {
        console.log("JWT Error:", error.message);
        res.status(401).json({ message: 'Unauthorized' });
    }
};