import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputService } from '../../services/input.service';
import debounce from 'lodash.debounce';
import { City } from './../../../types/city.type';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.css',
})
export class InputComponent {
    placeHolder = 'Find the best city for you!';
    input = '';
    cities: string[] = [];
    error = '';
    showOptions = false;

    constructor(private inputService: InputService) {}

    onInput = debounce(() => this.debounceInput(), 500);

    debounceInput() {
        if (this.input.length < 2) {
            this.showOptions = false;
            return;
        }

        this.inputService.getCities(this.input).subscribe({
            next: (resp: City[]) => {
                this.cities = resp.map((city: City) => city.name);
                this.showOptions = true;
            },
            error: () => {
                this.error = 'Something went wrong';
            },
        });
    }
}
