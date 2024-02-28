import { CityController } from '../src/infra/express/controllers/city.controller';
import App from '../src/infra/express/app';
import { ICityDal } from '../src/services/interfaces/dal/city.dal.interface';
import { CityService } from '../src/services/city.service';
import CityRouter from '../src/infra/express/routers/city.route';
import * as request from 'supertest';
import Logger from '../src/infra/winston/logger';

jest.setTimeout(60000);
let server: App;

class MockRepo implements ICityDal {
    searchCity = async (txt: string) => {
        if (txt === 'test') {
            return [{ name: 'tel aviv' }];
        } else {
            return [];
        }
    };
}
const mockDal = new MockRepo();

describe('CityRoute', () => {
    beforeAll(async () => {
        const cityService = new CityService(mockDal, new Logger());
        const cityController = new CityController(cityService);
        const cityRoute = new CityRouter(cityController);
        server = new App(3770, [cityRoute]);
    });

    test('search city', async () => {
        const cities = await request(server.getApp()).get('/api/city/search?city=test');
        expect(cities.status).toBe(200);
        expect(cities.body).toEqual([{ name: 'tel aviv' }]);
    });

    test('search city with empty result', async () => {
        const cities = await request(server.getApp()).get('/api/city/search?city=empty');
        expect(cities.status).toBe(200);
        expect(cities.body).toEqual([]);
    });

    test('search city with invalid input', async () => {
        const cities = await request(server.getApp()).get('/api/city/search?city=a');
        expect(cities.status).toBe(400);
    });
});
