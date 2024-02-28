import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputService } from '../../services/input.service';
import debounce from 'lodash.debounce';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.css',
})
export class InputComponent {
    placeHolder = 'enter your search';
    input = '';
    cities: string[] = [];

    constructor(private inputService: InputService) {}

    onInput = debounce(() => this.debounceInput(), 500);

    debounceInput() {
        if (this.input.length < 2) return;

        this.inputService.getCities(this.input).subscribe((resp: any) => {
            this.cities = resp.map((city: any) => city.name);
        });
    }
}
