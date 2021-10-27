import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
declare var hello: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: any;
 
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getUsers();
    new hello();
  }
  getUsers() {
    return this.http.get('https://localhost:44391/api/Users').subscribe(res => {
      this.users = res;
    }, err => {
      console.log(err);
    })
  }
  title = 'client';
}
