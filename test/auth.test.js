// test/auth.test.js
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const { User } = require('../models');

describe('Auth API', () => {
    before(async () => {
        await User.destroy({ where: {} }); // Clear the user table
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/users/register')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
            });
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('message', 'User registered successfully');
    });

    it('should login a user', async () => {
        const res = await request(app)
            .post('/users/login')
            .send({
                username: 'testuser',
                password: 'password123',
            });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('token');
    });

    it('should get the profile of the logged-in user', async () => {
        const loginRes = await request(app)
            .post('/users/login')
            .send({
                username: 'testuser',
                password: 'password123',
            });

        const token = loginRes.body.token;

        const profileRes = await request(app)
            .get('/users/profile')
            .set('Authorization', token);

        expect(profileRes.status).to.equal(200);
        expect(profileRes.body).to.have.property('username', 'testuser');
        expect(profileRes.body).to.have.property('email', 'testuser@example.com');
    });
});
