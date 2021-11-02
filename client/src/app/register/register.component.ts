import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {}
  @Output() registerCancel = new EventEmitter();
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }
  register() {
    this.accountService.register(this.model).subscribe(user => {
      if (user) {
        this.cancel();
      }
    });
  }
  cancel() {
    this.registerCancel.emit(false);
  }
}
