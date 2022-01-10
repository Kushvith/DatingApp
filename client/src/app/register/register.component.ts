import { error } from '@angular/compiler/src/util';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {}
  maxDate: Date;
  @Output() registerCancel = new EventEmitter();
  registerForm: FormGroup;
  validationError: string[] = [];
  constructor(private accountService: AccountService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date;
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  initializeForm() {
    this.registerForm = this.fb.group({
      userName: ['',Validators.required ],
      gender: ['male' ],
      knownAs: ['',Validators.required ],
      dateOfBith: ['',Validators.required ],
      city: ['',Validators.required ],
      country: ['',Validators.required ],
      password: ['',[Validators.required,Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required,this.matchValues('password')]]

    })
  }
  matchValues(matchTo): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value == control?.parent?.controls[matchTo].value ? null
        : { isMatching : true}
    }
  }
  register() {

    this.accountService.register(this.registerForm.value).subscribe(user => {
      if (user) {
        this.router.navigateByUrl("/members");
        this.cancel();
      }
    }, err => {
      this.validationError = err;
    });
  }
  cancel() {
    this.registerCancel.emit(false);
  }
}
