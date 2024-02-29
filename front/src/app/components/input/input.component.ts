import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputService } from '../../services/input.service';
import { City } from './../../../types/city.type';
import { debounceTime } from 'rxjs/operators';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.css',
})
export class InputComponent implements OnInit {
    placeHolder = 'Find the best city for you!';
    input = new FormControl();
    cities: string[] = [];
    error = '';
    showOptions = false;

    constructor(private inputService: InputService) {}

    ngOnInit() {
        this.input.valueChanges.pipe(debounceTime(200)).subscribe((userInput) => this.onInput(userInput));
    }

    onInput(userInput: string) {
        if (userInput.length < 2) {
            this.showOptions = false;
            return;
        }

        this.inputService.getCities(userInput).subscribe({
            next: (resp: City[]) => {
                this.error = '';
                this.cities = resp.map((city: City) => city.name);
                this.showOptions = true;
            },
            error: (e) => {
                this.error = 'Something went wrong';
            },
        });
    }
}
