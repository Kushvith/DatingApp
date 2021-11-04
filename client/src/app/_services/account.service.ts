import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { map } from "rxjs/operators"
import { User } from '../_models/User';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:44391/api/";
  private currentUserSource = new ReplaySubject<User>(1);
  userobservable$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }
  login(model: User) {
    return this.http.post<User>(this.baseUrl + 'Account/login', model).pipe(
      map((res: any) => {
        const user = res;
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }
  register(model) {
    return this.http.post(this.baseUrl + 'Account/register', model).pipe(
      map((res: any) => {
        const user = res;
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    );
  }
  setCurrentUser(user : User) {
    this.currentUserSource.next(user);
  }
  logout() {
    localStorage.removeItem("user");
    
    this.currentUserSource.next(null);
  }
}
