import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss'
})
export class CustomInputComponent{

  @Input() placeholder?: string;
  @Input() type?:'text' | 'password' | 'email' | 'number';
  @Input() autocomplete?: string;
  @Input() control: FormControl = new FormControl();
  @Input() required? = false;
  @Output() public outputSearch = new EventEmitter<string>();

  public emitSearch(search: string): any {
    
    this.outputSearch.emit(search);
  }
}
