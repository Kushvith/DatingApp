import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  
})

export class NavbarComponent implements OnInit {
  model: any = {};
  loggedIn: Boolean;
  isCollapsed = false;
  constructor(public Accountservice: AccountService) { }
  
  ngOnInit(): void {
    this.getUsers();
  }
  Login() {
   this.Accountservice.login(this.model).subscribe(res => {
     console.log(res);
     this.loggedIn = true;
   }, err => {
     console.log(err);
   });
  }
  Logout() {
    this.loggedIn = false;
    this.Accountservice.logout();
    console.log(this.loggedIn);
  }
  getUsers() {
    this.Accountservice.userobservable$.subscribe(res => {
      this.loggedIn = !!res;
    }, err => {
      console.log(err)
    })
  }
}
