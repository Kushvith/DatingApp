import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { map } from "rxjs/operators"
import { environment } from '../../environments/environment';
import { User } from '../_models/User';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  userobservable$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }
  login(model: User) {
    return this.http.post<User>(this.baseUrl + 'Account/login', model).pipe(
      map((res: any) => {
        const user = res;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }
  register(model) {
    return this.http.post(this.baseUrl + 'Account/register', model).pipe(
      map((res: any) => {
        const user = res;
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }
  setCurrentUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
    this.currentUserSource.next(user);
  }
  logout() {
    localStorage.removeItem("user");
    
    this.currentUserSource.next(null);
  }
}
