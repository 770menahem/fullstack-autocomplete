import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { City } from '../../types/city.type';

@Injectable({
    providedIn: 'root',
})
export class InputService {
    constructor(private http: HttpClient) {}

    getCities(input: string): Observable<City[]> {
        return this.http.get(`${environment.backend_url}/city/search?city=${input}`) as Observable<City[]>;
    }
}
