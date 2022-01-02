import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from '../../_models/Member';
import { User } from '../../_models/User';
import { AccountService } from '../../_services/account.service';
import { MemberService } from '../../_services/member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild("editForm") editForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) unload($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  member: Member;
  user: User;
  constructor(private account: AccountService, private memberService: MemberService,private toastr:ToastrService) {
    this.account.userobservable$.pipe(take(1)).subscribe(user => this.user = user);
    
  }

  ngOnInit(): void {
    this.memberService.getMember(this.user.username).subscribe(member => this.member = member);
  }
 
  update() {
    this.memberService.memberEdit(this.member).subscribe(() => {
      this.toastr.success("updated sucessfully")
      this.editForm.reset(this.member)
    })
  }

}
