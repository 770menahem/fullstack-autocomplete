import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { InputService } from './input.service';
import { environment } from '../../environments/environment.development';

describe('InputService', () => {
    let service: InputService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });

        service = TestBed.inject(InputService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should make API call and return cities', () => {
        const mockCities: any[] = [
            {
                name: 'Chicago',
            },
        ];

        service.getCities('chicago').subscribe((cities) => {
            expect((cities as string[]).length).toBe(1);
            expect(cities).toEqual(mockCities);
        });

        const req = httpTestingController.expectOne(`${environment.backend_url}/cities?term=chicago`);

        expect(req.request.method).toEqual('GET');

        req.flush(mockCities);
    });
});
