import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../_models/Member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  constructor() { }
  @Input() member: Member;
  ngOnInit(): void {
  }

}
