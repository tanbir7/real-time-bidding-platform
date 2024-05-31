module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        starting_price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        current_price: {
            type: DataTypes.DECIMAL,
            defaultValue: DataTypes.DECIMAL
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User', 
                key: 'id'
            }

        }
    });

    Item.associate = (models) => {
        Item.hasMany(models.Bid, {foreignKey: 'itemId'});
        Item.belongsTo(models.User, {foreignKey:'userId'})
    };

    return Item;
};
