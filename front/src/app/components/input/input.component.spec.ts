import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { InputService } from '../../services/input.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InputComponent', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;
    let inputService: InputService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InputComponent, HttpClientTestingModule],
            providers: [InputService],
        }).compileComponents();

        fixture = TestBed.createComponent(InputComponent);
        inputService = TestBed.inject(InputService); // Inject InputService

        component = fixture.componentInstance;
    });

    it('should update cities on input change', async () => {
        const userInput = 'tel';
        const cities = [{ name: 'Tel Aviv' }, { name: 'Telangana' }]; // Example response
        spyOn(inputService, 'getCities').and.returnValue(of(cities)); // Mocking getCities method

        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input');
        input.value = userInput;
        input.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.showOptions).toBe(true);

        expect(component.cities).toEqual(['Tel Aviv', 'Telangana']);
        expect(component.error).toBe('');
    });

    it('should not get cities below 2 characters', async () => {
        const userInput = 't';
        const cities = [{ name: 'Tel Aviv' }, { name: 'Telangana' }]; // Example response
        spyOn(inputService, 'getCities').and.returnValue(of(cities)); // Mocking getCities method

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

    it('should handle error', async () => {
        const userInput = 'tel';
        spyOn(inputService, 'getCities').and.returnValue(throwError(() => new Error('Something went wrong'))); // Mocking getCities method

        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input');
        input.value = userInput;
        input.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.error).toBe('Something went wrong');
    });

    it('should show cities when cities and input are valid', async () => {
        const userInput = 'tel';
        const cities = [{ name: 'Tel Aviv' }, { name: 'Telangana' }]; // Example response

        component.cities = cities.map((city) => city.name);
        component.error = '';
        component.showOptions = true;
        component.input.setValue(userInput);

        fixture.detectChanges();
        await fixture.whenStable();

        const ul = fixture.nativeElement.querySelector('ul');
        expect(ul).toBeTruthy();

        const li = fixture.nativeElement.querySelectorAll('li');

        expect(li.length).toBe(cities.length);
    });

    it('should not show cities when input short', async () => {
        const userInput = 't';
        const cities = [{ name: 'Tel Aviv' }, { name: 'Telangana' }]; // Example response

        component.cities = cities.map((city) => city.name);
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

    it('should show "not found" when input valid and no cities', async () => {
        const userInput = 'tel';
        const cities: { name: string }[] = []; // Example response

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
});
