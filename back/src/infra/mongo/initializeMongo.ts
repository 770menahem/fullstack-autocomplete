import mongoose from 'mongoose';

// const opts: ConnectOptions = {
//     useNewUrlParser: true,express
//     useUnifiedTopology: true,
//     useCreateIndex: true,
// };

const conn = mongoose.createConnection();

/**
 * Connect to mongo
 */
export const connect = async (uri: string) => {
    console.log('Connecting to Mongo');

    await conn.openUri(uri);

    console.log('Mongo connection established');
};

export default conn;
