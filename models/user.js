// models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role:{
            type: DataTypes.ENUM( 'admin','user'),
            defaultValue: 'user'
        }
    }, {
        freezeTableName: true // This will keep the table name singular
    });

    User.associate = (models) =>{
        User.hasMany(models.Item, { foreignKey: 'userId' });
    } 

    return User;
};
