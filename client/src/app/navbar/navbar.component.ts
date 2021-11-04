import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  
})

export class NavbarComponent implements OnInit {
  model: any = {};
  isCollapsed = true;
  constructor(public Accountservice: AccountService, private toastr: ToastrService,private router :Router) { }
  
  ngOnInit(): void {
    this.getUsers();
  }
  Login() {
    this.Accountservice.login(this.model).subscribe(res => {
      this.router.navigateByUrl('members');
   }, err => {
     console.log(err);
     this.toastr.error(err.name);
   });
  }
  Logout() {
    this.Accountservice.logout();
    this.router.navigateByUrl("/");
  }
  getUsers() {
    this.Accountservice.userobservable$.subscribe(res => {
    }, err => {
      console.log(err)
    })
  }
}
