import request from 'supertest';
import app from '../../app';
import { MongoMemoryServer } from 'mongodb-memory-server';
const mongoose = require('mongoose');
import { ILocation } from '../../models';

let locationId = new mongoose.Types.ObjectId().toString();
const locationData: Partial<ILocation> = {
    name: "Vadodara, Gujarat, India",
    latitude: 22.3072,
    longitude: 73.1812
};
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Location Controller', () => {

    describe('POST /api/locations', () => {
        it('should create a new location', async () => {
            const response = await request(app).post('/api/locations').send(locationData);
            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty('_id');
            locationId = response.body.data._id;
        });

        it('should return validation error if latitude is missing', async () => {
            const { latitude, ...badLocation } = locationData;
            const response = await request(app).post('/api/locations').send(badLocation);
            expect(response.status).toBe(400);
            expect(response.body.status).toBeFalsy();
        });
    });

    describe('GET /api/locations/:locationId', () => {
        it('should return a location', async () => {
            const response = await request(app).get(`/api/locations/${locationId}`);
            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty('name', locationData.name);
        });

        it('should return 404 if location not found', async () => {
            const response = await request(app).get(`/api/locations/${new mongoose.Types.ObjectId().toString()}`);
            expect(response.status).toBe(404);
            expect(response.body.status).toBeFalsy();
        });
    });

    describe('PUT /api/locations/:locationId', () => {
        it('should update a location', async () => {
            const response = await request(app).put(`/api/locations/${locationId}`).send({ name: "Location Name Updated" });
            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty('name', "Location Name Updated");
        });

        it('should return 404 if location not found', async () => {
            const response = await request(app).put(`/api/locations/${new mongoose.Types.ObjectId().toString()}`).send({ title: "Updated Test location" });
            expect(response.status).toBe(404);
            expect(response.body.status).toBeFalsy();
        });
    });

    describe('GET /api/locations', () => {
        it('should return a list of locations', async () => {
            const paginationOptions = { page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'DESC' };
            const response = await request(app).get('/api/locations').query(paginationOptions);
            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty("data");
            expect(response.body.data).toHaveProperty("count");
        });
    });

    describe('DELETE /api/locations/:locationId', () => {
        it('should delete a location', async () => {
            const response = await request(app).delete(`/api/locations/${locationId}`);
            expect(response.status).toBe(200);
            expect(response.body.data.message).toBe('Location deleted successfully');
        });

        it('should return 404 if location not found', async () => {
            const response = await request(app).delete(`/api/locations/${new mongoose.Types.ObjectId().toString()}`);
            expect(response.status).toBe(404);
            expect(response.body.status).toBeFalsy();
        });
    });

});
