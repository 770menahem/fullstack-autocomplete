import { ICityController } from '../controllers/city.controller.interface';
import validateRequest from '../joi/joi';
import { searchSchema } from '../joi/search.schema';

import { wrapController } from '../utils/wraps';
import { BaseRouter } from './baseRouter';

class CityRouter extends BaseRouter<ICityController> {
    constructor(userController: ICityController) {
        super(userController);
        this.path = '/city';
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this._router.get('/search', validateRequest(searchSchema), wrapController(this.controller.searchCity));
    }
}

export default CityRouter;
