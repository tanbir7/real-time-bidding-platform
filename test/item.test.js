const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const { User, Item } = require('../models');

describe('Item API', () => {
    let token;
    let itemId;

    before(async () => {
        await Item.destroy({ where: {} });
        await User.destroy({ where: {} });

        const userRes = await request(app)
            .post('/users/register')
            .send({
                username: 'itemuser',
                email: 'itemuser@example.com',
                password: 'password123',
            });

        const loginRes = await request(app)
            .post('/users/login')
            .send({
                username: 'itemuser',
                password: 'password123',
            });
        token = loginRes.body.token;
    });

    it('should create a new auction item', async () => {
        const itemRes = await request(app)
            .post('/items')
            .set('Authorization', token)
            .send({
                name: 'Test Item',
                description: 'A test item for auction',
                starting_price: 100.00,
                end_time: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
            });
        expect(itemRes.status).to.equal(201);
        expect(itemRes.body).to.have.property('name', 'Test Item');
        itemId = itemRes.body.id;
    });

    it('should retrieve all auction items', async () => {
        const itemsRes = await request(app).get('/items');
        expect(itemsRes.status).to.equal(200);
        expect(itemsRes.body.items).to.be.an('array');
        expect(itemsRes.body.items[0]).to.have.property('name', 'Test Item');
    });

    it('should retrieve a single auction item by ID', async () => {
        const itemRes = await request(app).get(`/items/${itemId}`);
        expect(itemRes.status).to.equal(200);
        expect(itemRes.body).to.have.property('name', 'Test Item');
    });

    it('should update an auction item by ID', async () => {
        const updateRes = await request(app)
            .put(`/items/${itemId}`)
            .set('Authorization', token)
            .send({
                name: 'Updated Test Item',
                description: 'Updated description',
                starting_price: 200.00,
            });
        expect(updateRes.status).to.equal(200);
        expect(updateRes.body).to.have.property('name', 'Updated Test Item');
    });

    it('should delete an auction item by ID', async () => {
        const deleteRes = await request(app)
            .delete(`/items/${itemId}`)
            .set('Authorization', token);
        expect(deleteRes.status).to.equal(200);
        expect(deleteRes.body).to.have.property('message', 'Item deleted successfully');
    });
});
