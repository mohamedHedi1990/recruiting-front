import { BehaviorSubject } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/user';

@Component({
  selector: 'ngx-sectionquatre',
  templateUrl: './sectionquatre.component.html',
  styleUrls: ['./sectionquatre.component.scss']
})
export class SectionquatreComponent implements OnInit {
  user: User = new User()
  checkEmail;
  passwordconfirme: string = ''
 @Input() section 

  constructor() { }

  ngOnInit(): void {
  }
  next(event) {
    // this.loginRequest.role=event.target.value
    console.log(event.target.value);
    console.log(event.target.id);
    this.section.next( event.target.id)
  }
  checkMail() {
    this.checkEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.user.userEmail);
  }
  checkSection3Valid(): boolean {
    return this.user.userEmail === '' || this.user.userLogin === '' ||
      this.passwordconfirme === '' || this.user.userPassword === '' || this.user.userPassword !== this.passwordconfirme;
  }
}
