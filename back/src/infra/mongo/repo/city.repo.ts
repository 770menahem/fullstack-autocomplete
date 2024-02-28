import City from '../../../types/city.type';
import { BaseRepository } from './baseRepository';
import { ICityDal } from '../../../services/interfaces/dal/city.dal.interface';

export class CityRepo extends BaseRepository<City> implements ICityDal {
    searchCity = async (txt: string) => {
        // const city = await this._model.find({
        //     $text: { $search: txt, $caseSensitive: false, $diacriticSensitive: false },
        // });

        const city = await this._model.find({ name: { $regex: txt, $options: 'i' } });

        return city;
    };
}
