import * as dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config();

const config = {
    server: {
        port: env.get('PORT').required().asPortNumber(),
    },
    mongo: {
        uri: env.get('MONGO_URI').required().asString(),
        cityCollectionName: env.get('CITY_COLLECTION_NAME').required().asString(),
        needSeed: env.get('NEED_SEED').required().asBool(),
    },
};

export default config;
