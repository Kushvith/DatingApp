import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/Member';
import { MemberService } from '../../_services/member.service';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  member: Member
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  toggle: Boolean = true;
  srcwidth: any;
  @HostListener('window:resize', ['$event']) getscreensize(event?) {
    this.srcwidth = window.innerWidth;
  }
  constructor(private memberservice: MemberService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: '300px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }];
    this.getMember();
    this.getscreensize();
    this.getsmall();
  }
  getsmall() {
    if (this.srcwidth < 990) {
      this.toggle = false;
    }
  }
  change() {
    if (this.srcwidth < 990) {
      this.toggle = !this.toggle;
    }
    
  }
  getMember() {
    this.memberservice.getMember(this.route.snapshot.paramMap.get("username")).subscribe(member =>
    { this.member = member; this.galleryImages = this.getImages(); })
  }
  getImages(): NgxGalleryImage[] {
    const imgUrl = [];
    for (const photo of this.member.photos) {
      imgUrl.push({

        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      }
      )
    }
    return imgUrl;
  }
}
