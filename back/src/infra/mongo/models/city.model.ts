import mongoose from 'mongoose';
import City from '../../../types/city.type';

export const citySchema = new mongoose.Schema<City>(
    {
        name: { type: String, required: true, unique: true, index: true },
        options: { type: [String], required: true, index: true, default: [] },
    },
    { versionKey: false },
);
