// services/authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config');

class AuthService {
    static async register({ username, email, password }) {
        console.log(User)
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        return user;
    }

    static async login({ username, password }) {
        const user = await User.findOne({ where: { username } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user.id, role: user.role }, config.JWT_SECRET, { expiresIn: '1h' });
        console.log(token);
        return token;
    }

    static async getUserById(id) {
        console.log("ID:",id)
        const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
        console.log("User",user)
        return user;
    }
}

module.exports = AuthService;
