import config from './config/config';

import Logger from './infra/winston/logger';
import conn from './infra/mongo/initializeMongo';
import App from './infra/express/app';
import CityRouter from './infra/express/routers/city.route';
import { CityRepo } from './infra/mongo/repo/city.repo';
import { citySchema } from './infra/mongo/models/city.model';
import { CityService } from './services/city.service';
import { CityController } from './infra/express/controllers/city.controller';

export function initializeApp(port: any) {
    const logger = new Logger();

    const userRepo = new CityRepo(conn, config.mongo.cityCollectionName, citySchema);

    const userService = new CityService(userRepo, logger);

    const userController = new CityController(userService);

    const userRouter = new CityRouter(userController);

    return new App(port, [userRouter]);
}
