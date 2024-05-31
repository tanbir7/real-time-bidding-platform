const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const { User, Item, Notification } = require('../models');

describe('Notification API', () => {
    let token;
    let itemId;

    before(async () => {
        await Notification.destroy({ where: {} });
        await Item.destroy({ where: {} });
        await User.destroy({ where: {} });

        const userRes = await request(app)
            .post('/users/register')
            .send({
                username: 'notifyuser',
                email: 'notifyuser@example.com',
                password: 'password123',
            });

        const loginRes = await request(app)
            .post('/users/login')
            .send({
                username: 'notifyuser',
                password: 'password123',
            });
        token = loginRes.body.token;

        const itemRes = await request(app)
            .post('/items')
            .set('Authorization', token)
            .send({
                name: 'Notification Item',
                description: 'A test item for notification',
                starting_price: 100.00,
                end_time: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
            });
        itemId = itemRes.body.id;
    });

    it('should retrieve notifications for the logged-in user', async () => {
        // Trigger a notification by placing a bid
        await request(app)
            .post(`/items/${itemId}/bids`)
            .set('Authorization', token)
            .send({
                bid_amount: 150.00,
            });

        const notifyRes = await request(app)
            .get('/notifications')
            .set('Authorization', token);
        expect(notifyRes.status).to.equal(200);
        expect(notifyRes.body).to.be.an('array');
        expect(notifyRes.body[0]).to.have.property('message');
    });

    it('should mark notifications as read', async () => {
        const markReadRes = await request(app)
            .post('/notifications/mark-read')
            .set('Authorization', token);
        expect(markReadRes.status).to.equal(200);
        expect(markReadRes.body).to.have.property('message', 'Notifications marked as read');
    });
});
