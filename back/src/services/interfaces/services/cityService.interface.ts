import City from '../../../types/city.type';

export interface ICityService {
    searchCity(txt: string): Promise<City[] | null>;
}
