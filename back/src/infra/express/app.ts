import * as cors from 'cors';
import * as express from 'express';
import { Server } from 'http';
import * as logger from 'morgan';
import IRouter from './routers/router.interface';
import { errorMiddleware } from './utils/error';
import checkConnections from './utils/checkConnections';

require('dotenv').config();

/**
 * Initializing the express server
 */
class App {
    private port: number;
    private app: express.Application;
    private routers: IRouter[];
    private server: Server | undefined;

    constructor(port: number, routers: IRouter[]) {
        this.port = port || 1770;
        this.routers = routers;
        this.app = express();
        this.config();
        this.initializeRouters();
    }

    public getApp(): express.Application {
        return this.app;
    }

    private config(): void {
        this.app.use(logger('dev'));
        this.app.use(cors({ origin: '*', credentials: true }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRouters(): void {
        this.routers.forEach((router) => {
            this.app.use('/api' + router.path, router.router);
        });
        this.app.use(errorMiddleware);
        this.app.use('/isAlive', (_req, res) => (checkConnections() ? res.status(200).send('OK') : res.status(500).send('Not OK')));
        this.app.use('*', (_req, res) => res.status(404).send('Invalid route'));
    }

    public async start(): Promise<void> {
        this.server = this.app.listen(this.port, () => console.log(`Server started on port ${this.port}`));
    }

    public async stop(): Promise<void> {
        this.server?.close();
    }
}

export default App;
