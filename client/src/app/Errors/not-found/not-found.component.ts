import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  name: any;
  url: any;
  constructor(private AccountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.getuser();
  }
  getuser() {
    this.AccountService.userobservable$.subscribe(res => {
      if (res == null) {
        this.url = "/";
        return this.name = "Return to Home page";
      }
      else {
        this.url = "/members";
        this.name = "Return to members page";
      }
    })
  }
}
