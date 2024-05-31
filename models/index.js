require('dotenv').config(); // Make sure to load environment variables

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // You can set this to console.log to see the raw SQL queries
});



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Item = require('./item')(sequelize, Sequelize);
db.Bid = require('./bid')(sequelize, Sequelize);
db.Notification = require('./notification')(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
