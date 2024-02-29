import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { InputService } from './input.service';
import { environment } from '../../environments/environment.development';

describe('InputService', () => {
    let service: InputService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(InputService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be return a list of cities', () => {
        const input = 'tel';
        const response = [{ name: 'tel aviv' }, { name: 'tel aviv yafo' }];

        service.getCities(input).subscribe((cities) => {
            expect(cities).toEqual(response);
        });

        const req = httpMock.expectOne({
            method: 'GET',
            url: `${environment.backend_url}/city/search?city=${input}`,
        });

        req.flush(response);
    });

    it('should be return empty list of cities', () => {
        const input = 'not exist city';
        const response: { name: string }[] = [];

        service.getCities(input).subscribe((cities) => {
            expect(cities).toEqual(response);
        });

        const req = httpMock.expectOne({
            method: 'GET',
            url: `${environment.backend_url}/city/search?city=${input}`,
        });

        req.flush(response);
    });

    it('should be return 400 error', () => {
        const input = 't';

        service.getCities(input).subscribe({
            error: (err) => {
                expect(err.status).toBe(400);
            },
        });

        const req = httpMock.expectOne({
            method: 'GET',
            url: `${environment.backend_url}/city/search?city=${input}`,
        });

        req.flush({}, { status: 400, statusText: 'Bad Request' });
    });
});
