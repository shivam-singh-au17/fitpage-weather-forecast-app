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

// Setup a test database connection
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    const response = await request(app).post('/api/locations').send(locationData);
    locationId = response.body.data._id;
});

// Close the database connection after all tests
afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Weather Controller', () => {

    describe('GET /api/weathers/:locationId', () => {
        const queryOptions = { daysAhead: 1 };

        it('should return a weather', async () => {
            const response = await request(app).get(`/api/weathers/${locationId}`).query(queryOptions);
            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty('forecast');
        });

        it('should return 404 if location not found', async () => {
            const response = await request(app).get(`/api/weathers/${new mongoose.Types.ObjectId().toString()}`).query(queryOptions);
            expect(response.status).toBe(404);
            expect(response.body.status).toBeFalsy();
        });
    });

    describe('GET /api/weathers/history', () => {
        
        it('should return a weather history', async () => {
            const queryOptions = { locationId, daysBehind: 7 };
            const response = await request(app).get(`/api/weathers/history`).query(queryOptions);
            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty('forecast');
        });

        it('should return 404 if location not found', async () => {
            const queryOptions = { locationId: new mongoose.Types.ObjectId().toString(), daysBehind: 7 };
            const response = await request(app).get(`/api/weathers/history`).query(queryOptions);
            expect(response.status).toBe(404);
            expect(response.body.status).toBeFalsy();
        });
    });

});