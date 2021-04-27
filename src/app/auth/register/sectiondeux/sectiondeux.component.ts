import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';

@Component({
  selector: 'ngx-sectiondeux',
  templateUrl: './sectiondeux.component.html',
  styleUrls: ['./sectiondeux.component.scss']
})
export class SectiondeuxComponent implements OnInit {
  user: User = new User()
  section =new BehaviorSubject('1')
  cities_: Array<any>;
  worldMapData = require('city-state-country');
  countriesList = this.worldMapData.getAllCountries();
  constructor() { }

  ngOnInit(): void {
  }
  next(event) {
    // this.loginRequest.role=event.target.value
    console.log(event.target.value);
    console.log(event.target.id);
    this.section.next( event.target.id)
  }
  checkSection1Valid(): boolean {
    return this.user.userFirstName === '' || this.user.userLastName === '' ||
      this.user.userGender == '' || this.user.userCivilStatus === '' ||
      this.user.userBirthDate == '' || this.user.userBirthCity == null || this.user.userBirthCountry === '';
  }
  changeCountry_(count) {
    this.cities_ = this.worldMapData.getAllStatesFromCountry(count);

  }
}
