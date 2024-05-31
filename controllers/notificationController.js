// controllers/notificationController.js
const { Notification } = require('../models');

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({ where: { userId: req.user.id } });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.markRead = async (req, res) => {
    try {
        await Notification.update({ is_read: true }, { where: { userId: req.user.id, is_read: false } });
        res.status(200).json({ message: 'Notifications marked as read' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};