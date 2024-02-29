import { CityDto } from '../dto/city.dto';

export interface ICityService {
    searchCity(txt: string): Promise<CityDto[] | null>;
}
