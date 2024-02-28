import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class InputService {
    constructor(private http: HttpClient) {}

    getCities(input: string) {
        return this.http.get(`http://localhost:1370/api/city/search?city=${input}`);
    }
}
