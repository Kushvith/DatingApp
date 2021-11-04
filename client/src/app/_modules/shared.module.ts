import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot(
      {
        positionClass: 'toast-bottom-right'
      })
  ],
  exports: [
    CollapseModule,
    BsDropdownModule,
    ToastrModule
  ]
})
export class SharedModule { }
