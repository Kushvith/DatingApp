import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { MemberListsComponent } from './members/member-lists/member-lists.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { SharedModule } from './_modules/shared.module';
import { TestsErrorComponent } from './Errors/tests-error/tests-error.component';
import { AuthInterceptor } from './_interceptor/auth.interceptor';
import { NotFoundComponent } from './Errors/not-found/not-found.component';
import { InternalServerComponent } from './Errors/internal-server/internal-server.component';
import { JwtInterceptor } from './_interceptor/jwt.interceptor';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BusyInterceptor } from './_interceptor/busy.interceptor';
import { MemberPhotosComponent } from './members/member-photos/member-photos.component';
import { InputComponentComponent } from './_forms/input-component/input-component.component';
import { InputDatepickerComponent } from './_forms/input-datepicker/input-datepicker.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    MemberListsComponent,
    MemberDetailsComponent,
    ListsComponent,
    MessagesComponent,
    TestsErrorComponent,
    NotFoundComponent,
    InternalServerComponent,
    MemberCardComponent,
    MemberEditComponent,
    MemberPhotosComponent,
    InputComponentComponent,
    InputDatepickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BusyInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
