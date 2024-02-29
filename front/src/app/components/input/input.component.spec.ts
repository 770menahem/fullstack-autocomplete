import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { InputService } from '../../services/input.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InputComponent', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;
    let inputService: InputService;
    const mockCities = [{ name: 'Tel Aviv' }, { name: 'Telangana' }];
    const mockCitiesStr = ['Tel Aviv', 'Telangana'];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InputComponent, HttpClientTestingModule],
            providers: [InputService],
        }).compileComponents();

        fixture = TestBed.createComponent(InputComponent);
        inputService = TestBed.inject(InputService);

        component = fixture.componentInstance;
    });

    it('should not show cities when input short', async () => {
        const userInput = 't';

        component.cities = mockCities.map((city) => city.name);
        component.error = '';
        component.showOptions = true;
        component.input.setValue(userInput);

        fixture.detectChanges();
        await fixture.whenStable();

        const ul = fixture.nativeElement.querySelector('ul');
        expect(ul).toBeFalsy();

        const li = fixture.nativeElement.querySelectorAll('li');

        expect(li.length).toBe(0);
    });

    it('should not get cities below 2 characters', async () => {
        const userInput = 't';
        spyOn(inputService, 'getCities').and.returnValue(of(mockCities));

        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input');
        input.value = userInput;
        input.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.showOptions).toBe(false);

        expect(component.cities).toEqual([]);
        expect(component.error).toBe('');
    });

    it('should update cities on input change', async () => {
        const userInput = 'tel';
        spyOn(inputService, 'getCities').and.returnValue(of(mockCities));

        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input');
        input.value = userInput;
        input.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.showOptions).toBe(true);

        expect(component.cities).toEqual(mockCitiesStr);
        expect(component.error).toBe('');
    });

    it('should handle error', async () => {
        const userInput = 'tel';
        spyOn(inputService, 'getCities').and.returnValue(throwError(() => new Error('Something went wrong')));

        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input');
        input.value = userInput;
        input.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.error).toBe('Something went wrong');
    });

    it('should show "not found" when input valid and no cities', async () => {
        const userInput = 'tel';
        const cities: { name: string }[] = [];

        component.cities = cities.map((city) => city.name);
        component.error = '';
        component.showOptions = true;
        component.input.setValue(userInput);

        fixture.detectChanges();
        await fixture.whenStable();

        const ul = fixture.nativeElement.querySelector('ul');
        expect(ul).toBeTruthy();

        const li = fixture.nativeElement.querySelectorAll('li');

        expect(li.length).toBe(1);
        expect(li[0].textContent).toContain('No result found');
    });

    it('should show cities when cities and input are valid', async () => {
        const userInput = 'tel';

        component.cities = mockCities.map((city) => city.name);
        component.error = '';
        component.showOptions = true;
        component.input.setValue(userInput);

        fixture.detectChanges();
        await fixture.whenStable();

        const ul = fixture.nativeElement.querySelector('ul');
        expect(ul).toBeTruthy();

        const li = fixture.nativeElement.querySelectorAll('li');

        expect(li.length).toBe(mockCities.length);
    });

    it('should remove the list when input is to short', async () => {
        const userInput = 'tel';

        spyOn(inputService, 'getCities').and.returnValue(of(mockCities));
        const input = fixture.nativeElement.querySelector('input');

        fixture.detectChanges();

        input.value = userInput;
        input.dispatchEvent(new Event('input'));

        await fixture.whenStable();
        fixture.detectChanges();

        const li = fixture.nativeElement.querySelectorAll('li');

        expect(li.length).toBe(2);

        input.value = 't';
        input.dispatchEvent(new Event('input'));

        await fixture.whenStable();
        fixture.detectChanges();

        const ulAfter = fixture.nativeElement.querySelector('ul');

        expect(ulAfter).toBeFalsy();
    });

    it('should remove the error when input is valid', async () => {
        const userInput = 'tel';

        spyOn(inputService, 'getCities').and.returnValue(of(mockCities));
        const input = fixture.nativeElement.querySelector('input');
        component.error = 'Something went wrong';

        fixture.detectChanges();

        input.value = userInput;

        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        await fixture.whenStable();

        expect(component.error).toBe('');
    });

    it('should not send request each input change', async () => {
        const userInput = 'tel';

        spyOn(inputService, 'getCities').and.returnValue(of(mockCities));
        const input = fixture.nativeElement.querySelector('input');

        fixture.detectChanges();

        input.value = userInput;
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        input.value = userInput + 'a';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        await fixture.whenStable();

        expect(inputService.getCities).toHaveBeenCalledTimes(1);
    });
});
