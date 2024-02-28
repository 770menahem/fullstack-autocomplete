import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class InputService {
    constructor(private http: HttpClient) {}

    getCities(input: string) {
        return this.http.get(`${environment.backend_url}/city/search?city=${input}`);
    }
}
