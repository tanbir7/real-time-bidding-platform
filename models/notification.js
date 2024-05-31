module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });

    Notification.associate = (models) => {
        Notification.belongsTo(models.User, { foreignKey: 'userId' });
    };

    return Notification;
};
