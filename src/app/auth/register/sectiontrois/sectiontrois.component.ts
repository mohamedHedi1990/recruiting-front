import { Component, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../models/user';

@Component({
  selector: 'ngx-sectiontrois',
  templateUrl: './sectiontrois.component.html',
  styleUrls: ['./sectiontrois.component.scss']
})
export class SectiontroisComponent implements OnInit {
  CheckTelHasError;
  phone: any;
  user: User = new User()
  worldMapData = require('city-state-country');
  countriesList = this.worldMapData.getAllCountries();

  cities: Array<any>;
  cities_: Array<any>;
  @Input() section

  constructor() { }

  ngOnInit(): void {
  }
  hasError($event) {
    this.CheckTelHasError = $event;

  }
  getNumber($event) {
    this.phone = $event;
  }
  onCountryChange($event) {
    this.user.userPhoneNumber = null;

    this.CheckTelHasError = true;
  }

  changeCountry_(count) {
    this.cities_ = this.worldMapData.getAllStatesFromCountry(count);

  }
  checkSection2Valid(): boolean {

    return this.user.userPhoneNumber == null || this.user.userPays === undefined ||
      this.user.userAddress === undefined

  }
  next(event) {
    // this.loginRequest.role=event.target.value
    console.log(event.target.value);
    console.log(event.target.id);
    this.section.next(event.target.id)
    
  }

}
