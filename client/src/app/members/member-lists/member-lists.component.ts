import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../../_models/Member';
import { AccountService } from '../../_services/account.service';
import { MemberService } from '../../_services/member.service';

@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.css']
})
export class MemberListsComponent implements OnInit {
  members$: Observable<Member[]>;
  constructor(private memberService: MemberService, private accountService: AccountService) {
    
  }

  ngOnInit() {
    this.members$ = this.memberService.getMembers();
  }
 

}
