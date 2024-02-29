import { ICityDal } from './interfaces/dal/city.dal.interface';
import { ICityService } from './interfaces/services/cityService.interface';
import { ILogger } from '../log/logger';
import { CityDto } from './interfaces/dto/city.dto';
import { ServiceError } from '../infra/express/utils/error';

export class CityService implements ICityService {
    private cityRepo: ICityDal;
    private _logger: ILogger;

    constructor(cityRepo: ICityDal, logger: ILogger) {
        this.cityRepo = cityRepo;
        this._logger = logger;
    }

    searchCity = async (txt: string): Promise<CityDto[]> => {
        const cities = await this.cityRepo.searchCity(txt);

        if (!cities) {
            this._logger.logError({ message: 'fail to search city' });
            throw new ServiceError(400, 'City not found');
        }

        this._logger.logInfo({ message: `${cities.length} city found successfully` });

        return cities;
    };
}
