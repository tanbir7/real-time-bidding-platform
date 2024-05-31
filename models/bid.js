module.exports = (sequelize, DataTypes) => {
    const Bid = sequelize.define('Bid', {
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Items', // Name of the table being referenced
                key: 'id',
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User', // Name of the table being referenced
                key: 'id',
            }
        },
        bidAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },{
        freezeTableName: true,
    });

    Bid.associate = (models) => {
        Bid.belongsTo(models.Item, { foreignKey: 'itemId'  });
        Bid.belongsTo(models.User, { foreignKey: 'userId' });
    };
   
    return Bid;
};


