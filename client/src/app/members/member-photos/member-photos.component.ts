import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { Member } from '../../_models/Member';
import { Photo } from '../../_models/photo';
import { User } from '../../_models/User';
import { AccountService } from '../../_services/account.service';
import { MemberService } from '../../_services/member.service';

@Component({
  selector: 'app-member-photos',
  templateUrl: './member-photos.component.html',
  styleUrls: ['./member-photos.component.css']
})
export class MemberPhotosComponent implements OnInit {
  @Input() member: Member
  uploader: FileUploader
  hasDropzoneOver = false;
  base = environment.apiUrl;
  user : User
  constructor(private accountservice: AccountService,private memberService : MemberService) {
    this.accountservice.userobservable$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.intializeUplaoder();
  }
  fileOverBase(e: any) {
    this.hasDropzoneOver = e;
  }
  setMain(photo:Photo) {
    this.memberService.getSetMain(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url;
      this.accountservice.setCurrentUser(this.user);
      this.member.photoUrl = photo.url;
      this.member.photos.forEach(p => {
        if (p.ismain) p.ismain = false;
        if (p.id == photo.id) p.ismain = true;
      })
    })
  }
  deleteMain(photoId) {
    this.memberService.getDelete(photoId).subscribe(() => {
     this.member.photos = this.member.photos.filter(x => x.id != photoId);
    })
  }
  intializeUplaoder() {
    this.uploader = new FileUploader({
      url: this.base + 'Users/add-photo',
      authToken: "Bearer " + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    })
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }
    this.uploader.onSuccessItem = (item, response, status, headers)=>{
      if (response) {
        const photo = JSON.parse(response);
        this.member.photos.push(photo);
      }
    }
  }

}
