import { Component, HostListener, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-input-datepicker',
  templateUrl: './input-datepicker.component.html',
  styleUrls: ['./input-datepicker.component.css']
})
export class InputDatepickerComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() maxDate: Date;
  @ViewChild(BsDatepickerDirective, { static: false }) datepicker?: BsDatepickerDirective;

  @HostListener('window:scroll')
  onScrollEvent() {
    this.datepicker?.hide();
  }
  bsConfig?: Partial<BsDatepickerConfig>;
  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    this.bsConfig={
      containerClass: "theme-red",
      dateInputFormat:"DD MMMM YYYY"
    }
  }
    writeValue(obj: any): void {
    }
    registerOnChange(fn: any): void {
    }
    registerOnTouched(fn: any): void {
    }
}
