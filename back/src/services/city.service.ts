import { ICityDal } from './interfaces/dal/city.dal.interface';
import { ICityService } from './interfaces/services/cityService.interface';
import { ILogger } from '../log/logger';

export class CityService implements ICityService {
    private cityRepo: ICityDal;
    private _logger: ILogger;

    constructor(cityRepo: ICityDal, logger: ILogger) {
        this.cityRepo = cityRepo;
        this._logger = logger;
    }

    searchCity = async (txt: string) => {
        const cities = await this.cityRepo.searchCity(txt);

        if (!cities) {
            this._logger.logError({ message: 'City not found' });
            return null;
        }

        this._logger.logInfo({ message: `${cities.length} city found successfully` });

        return cities;
    };
}
