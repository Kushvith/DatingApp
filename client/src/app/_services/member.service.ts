import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Member } from '../_models/Member';
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("user"))?.token
    })
  }
@Injectable({
  providedIn: 'root'
})

export class MemberService {
  member: Member[] = [];
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getMembers() {
    //of returns the observable
    if(this.member.length > 0) return of(this.member)
    return this.http.get<Member[]>(this.baseUrl + "Users").pipe(
      //here map returns the observable
      map(member => {
        this.member = member;
        return member;
      })
    );
  }
  getMember(username: string) {
    const member = this.member.find(x => x.userName == username);
    if (this.member != undefined) return of(member)
    return this.http.get<Member>(this.baseUrl + "Users/" + username)
  }
  memberEdit(member) {
    return this.http.put<Member>(this.baseUrl + "users", member).pipe(
      map(() => {
        const index = this.member.indexOf(member);
        this.member[index] = member;
      })
      

    );
  }
}
