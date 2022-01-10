import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input-component',
  templateUrl: './input-component.component.html',
  styleUrls: ['./input-component.component.css']
})
export class InputComponentComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() type = 'text';
  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }
    writeValue(obj: any): void {
    }
    registerOnChange(fn: any): void {
    }
    registerOnTouched(fn: any): void {
    }



}
