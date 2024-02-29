import City from '../../../types/city.type';
import { BaseRepository } from './baseRepository';
import { ICityDal } from '../../../services/interfaces/dal/city.dal.interface';
import { Connection, Schema } from 'mongoose';
import config from '../../../config/config';
import { readFileSync } from 'fs';
import { splitWordToPrefixes } from '../../../utils/splitWord';

export class CityRepo extends BaseRepository<City> implements ICityDal {
    constructor(db: Connection, modelName: string, schema: Schema<City>) {
        super(db, modelName, schema);

        if (config.mongo.needSeed) {
            this.seedDB();
        }
    }

    async seedDB() {
        const data = JSON.parse(readFileSync(__dirname + '/../../../../data.json', 'utf8'));
        await this._model.deleteMany({});

        await this._model.insertMany([...new Set<string>(data)].map((city: string) => ({ name: city, options: splitWordToPrefixes(city) })));

        console.log('Seeded DB');
    }

    searchCity = async (txt: string) => {
        const city = await this._model.find({ options: txt.trim().toLowerCase() }, { name: 1, _id: 0 });

        return city;
    };
}
