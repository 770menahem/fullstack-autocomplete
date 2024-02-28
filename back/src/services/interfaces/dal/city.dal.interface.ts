import City from '../../../types/city.type';

export interface ICityDal {
    searchCity(txt: string): Promise<City[] | null>;
}
