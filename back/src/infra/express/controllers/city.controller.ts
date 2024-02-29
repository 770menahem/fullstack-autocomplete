import { Request, Response } from 'express';
import { ServiceError } from '../utils/error';
import { ICityController } from './city.controller.interface';
import { ICityService } from '../../../services/interfaces/services/cityService.interface';
import { CityDto } from '../../../services/interfaces/dto/city.dto';

export class CityController implements ICityController {
    constructor(private cityService: ICityService) {
        console.log('CityController created');
    }

    searchCity = async (req: Request, res: Response): Promise<void> => {
        const txt = req.query.city as string;

        const cities: CityDto[] | null = await this.cityService.searchCity(txt);

        if (!cities) throw new ServiceError(404, 'City not found');
        else res.send(cities);
    };
}
