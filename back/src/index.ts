import config from './config/config';
import { initializeApp } from './initializeApp';
import { connect } from './infra/mongo/initializeMongo';

const { mongo } = config;

/**
 * The main function.
 * Calls all the initialization functions.
 */
const main = async () => {
    await connect(mongo.uri);

    const port = config.server.port || 2770;

    const app = initializeApp(port);

    app.start();
};

main().catch((err) => {
    console.log(err);
    process.exit();
});
