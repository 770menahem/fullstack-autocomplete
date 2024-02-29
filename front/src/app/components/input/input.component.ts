import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputService } from '../../services/input.service';
import { City } from './../../../types/city.type';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.css',
})
export class InputComponent implements OnInit, OnDestroy {
    subscription = new Subscription();
    input = new FormControl();
    placeHolder = 'Find the best city for you!';
    cities: string[] = [];
    error = '';
    showOptions = false;

    constructor(private inputService: InputService) {}

    ngOnInit() {
        this.subscription.add(this.input.valueChanges.pipe(debounceTime(200)).subscribe((userInput) => this.onInput(userInput)));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onInput(userInput: string) {
        if (userInput.length < 2) {
            this.showOptions = false;
            return;
        }

        this.inputService.getCities(userInput).subscribe({
            next: (cities: City[]) => {
                this.error = '';
                this.cities = cities.map(({ name }) => name);
                this.showOptions = true;
            },
            error: () => {
                this.error = 'Something went wrong';
                this.showOptions = false;
            },
        });
    }
}
