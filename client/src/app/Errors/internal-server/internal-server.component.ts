import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internal-server',
  templateUrl: './internal-server.component.html',
  styleUrls: ['./internal-server.component.css']
})
export class InternalServerComponent implements OnInit {
  error: any;
  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.error = nav?.extras?.state?.error
  }

  ngOnInit(): void {
  }
   
   
}
