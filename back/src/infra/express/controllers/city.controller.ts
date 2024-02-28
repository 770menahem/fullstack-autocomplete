import { Request, Response } from 'express';
import City from '../../../types/city.type';
import { ServiceError } from '../utils/error';
import { ICityController } from './city.controller.interface';
import { ICityService } from '../../../services/interfaces/services/cityService.interface';

export class CityController implements ICityController {
    constructor(private cityService: ICityService) {
        console.log('CityController created');
    }

    searchCity = async (req: Request, res: Response): Promise<void> => {
        const txt = req.query.city as string;

        const cities: City[] | null = await this.cityService.searchCity(txt);

        if (!cities) throw new ServiceError(404, 'City not found');
        else res.send(cities);
    };
}
