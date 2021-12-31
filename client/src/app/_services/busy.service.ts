import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  SetCount = 0;
  constructor(private ngxspinner : NgxSpinnerService) { }
  busy() {
    this.SetCount++;
    this.ngxspinner.show(undefined, {
      type: "line-scale-party",
      size: "large",
      bdColor: "rgba(255, 255, 255, 0)",
      color: "#000"
    })
  }
  idle() {
    this.SetCount--;
    if (this.SetCount <= 0) {
      this.SetCount = 0;
      this.ngxspinner.hide();
    }
  }
}
