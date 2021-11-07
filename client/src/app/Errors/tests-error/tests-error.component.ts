import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tests-error',
  templateUrl: './tests-error.component.html',
  styleUrls: ['./tests-error.component.css']
})
export class TestsErrorComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  baseUrl = "https://localhost:44391/api/Buggy/";
  ngOnInit() {
  }
  get404() {
     this.http.get(this.baseUrl + '404-error').subscribe(res => { console.log(res) }, err => { console.log(err) });
  }
  get401() {
     this.http.get(this.baseUrl + 'Auth').subscribe(res => { console.log(res) }, err => { console.log(err) });
  }
  get500() {
    this.http.get(this.baseUrl + 'server-error').subscribe(res => { console.log(res) }, err => { console.log(err) });
  }
  get400Validation() {
   this.http.post('https://localhost:44391/api/Account/register', {}).subscribe(res => { console.log(res) }, err => { console.log(err) });
  }
  get400() {
    this.http.get(this.baseUrl + 'bad-request').subscribe(res => { console.log(res) }, err => { console.log(err) });
  }
}
