const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const { User, Item, Bid } = require('../models');

describe('Bid API', () => {
    let token;
    let itemId;

    before(async () => {
        await Bid.destroy({ where: {} });
        await Item.destroy({ where: {} });
        await User.destroy({ where: {} });

        const userRes = await request(app)
            .post('/users/register')
            .send({
                username: 'biduser',
                email: 'biduser@example.com',
                password: 'password123',
            });

        const loginRes = await request(app)
            .post('/users/login')
            .send({
                username: 'biduser',
                password: 'password123',
            });
        token = loginRes.body.token;

        const itemRes = await request(app)
            .post('/items')
            .set('Authorization', token)
            .send({
                name: 'Test Item',
                description: 'A test item for bidding',
                starting_price: 100.00,
                end_time: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
            });
        itemId = itemRes.body.id;
    });

    it('should place a new bid on a specific item', async () => {
        const bidRes = await request(app)
            .post(`/items/${itemId}/bids`)
            .set('Authorization', token)
            .send({
                bid_amount: 150.00,
            });
        expect(bidRes.status).to.equal(201);
        expect(bidRes.body).to.have.property('itemId', itemId);
        expect(bidRes.body).to.have.property('bid_amount', 150.00);
    });

    it('should retrieve all bids for a specific item', async () => {
        const bidsRes = await request(app).get(`/items/${itemId}/bids`);
        expect(bidsRes.status).to.equal(200);
        expect(bidsRes.body).to.be.an('array');
        expect(bidsRes.body[0]).to.have.property('itemId', itemId);
    });
});
