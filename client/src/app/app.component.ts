import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AccountService } from './_services/account.service';
declare var hello: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: any;

  constructor(private http: HttpClient, private AccountService: AccountService) { }
  ngOnInit(): void {
    new hello();
    this.setcurrentUser();
  }
 
  title = 'client';
  setcurrentUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.AccountService.setCurrentUser(user);
  }
}
