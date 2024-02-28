import { Connection, FilterQuery, Model, Schema } from 'mongoose';
import config from '../../../config/config';
import { readFileSync } from 'fs';

//TODO: MAPPER ?!
export abstract class BaseRepository<T> {
    public _model: Model<T>;

    constructor(db: Connection, modelName: string, schema: Schema<T>) {
        this._model = db.model<T>(modelName, schema);

        if (config.mongo.needSeed) {
            this.seedDB();
        }
    }

    async seedDB() {
        const data = JSON.parse(readFileSync('data.json', 'utf8'));
        await this._model.deleteMany({});
        await this._model.insertMany([...new Set<string>(data)].map((city: string) => ({ name: city })));

        console.log('Seeded DB');
    }

    async create(item: T): Promise<T> {
        const resItem = await this._model.create(item);
        return resItem;
    }

    async getOneByIdentifier(identifierQuery: FilterQuery<T>): Promise<T | null> {
        let raw: T = await this._model.findOne(identifierQuery).lean();
        return raw;
    }

    async getOneByField(query: FilterQuery<T>): Promise<T | null> {
        let raw: T = await this._model.findOne(query).lean();
        return raw;
    }

    async update(identifier: string, item: Partial<T>): Promise<T | null> {
        const updatedRes = await this._model.findByIdAndUpdate(identifier, { $set: item });
        return updatedRes;
    }

    async deleteByIdentifier(identifierQuery: FilterQuery<T>): Promise<T | null> {
        const resDelete = await this._model.findOneAndDelete(identifierQuery);
        return resDelete;
    }

    async getAll(): Promise<T[]> {
        let items: T[] = await this._model.find().lean();
        return items;
    }

    async getMany(query: FilterQuery<T>): Promise<T[]> {
        let items: T[] = await this._model.find(query).lean();
        return items;
    }
}
