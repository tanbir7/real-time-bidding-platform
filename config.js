const {Client} = require('pg');

const client = new Client({
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DB_NAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    connect_timeout: 10,
    sslmode: 'prefer'
});
// console.log(client)


client.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Connection error', err.stack));



client.end()
    .then(() => console.log('Connection to PostgreSQL database closed'))
    .catch(err => console.error('Error closing connection', err.stack));


module.exports = {
    JWT_SECRET: process.env.JWT_SECRET
};