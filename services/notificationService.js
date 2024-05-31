// services/notificationService.js
const Notification = require('../models/notification');

exports.notifyUsers = async (userId, message) => {
    await Notification.create({ userId, message });
    // Emit the notification via Socket.io (assumes you have a way to access the io instance)
    io.to(userId).emit('notify', message);
};
class NotificationService {
    static async createNotification(userId, itemId, message) {
        try {
            return await Notification.create({ userId, itemId, message });
        } catch (error) {
            console.error("Error in createNotification:", error);
            throw new Error('Failed to create notification');
        }
    }
}
module.exports = NotificationService;