import { AuthServiceService } from './../../services/auth/auth-service.service';
import { Router } from '@angular/router';
import { JwtResponse } from './../../models/JwtResponse.model';
import { LoginRequest } from './../../models/LoginRequest.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class NgxRegisterComponent {
  user: any = {
    password: null,
    matricule: null,
    genre:'masculin',
    userCivilStatus:'Celibataire',
    role:''
  };
  checkEmail;
  phone: any;
  worldMapData = require('city-state-country');

  countriesList = this.worldMapData.getAllCountries();
  section:any='1'
  loginRequest: LoginRequest;
  cities: Array<any>;
  cities_: Array<any>;
  testAuth = false;
  authFailed = false;
  constructor(
    private router: Router, private serviceAuth: AuthServiceService) {

  }

  login() {

    this.loginRequest = new LoginRequest(this.user.matricule, this.user.password);
    this.serviceAuth.login(this.loginRequest).subscribe(
      (data: JwtResponse) => {

        localStorage.setItem('token', data.token);
        localStorage.setItem('userFirstName', data.userFirstName);
        localStorage.setItem('userLastName', data.userLastName);
        localStorage.setItem("roles", JSON.stringify(data.roles));
        if (data.userPictureUrl != null && data.userPictureUrl != "") {
          localStorage.setItem("picture", data.userPictureUrl)
        }
        this.router.navigateByUrl("/recruiting");
        this.testAuth = false;
      },
      (error) => {
        console.log("error");
        this.testAuth = true;
      }
    )
  }

  next(event){
    // this.loginRequest.role=event.target.value
    console.log(event.target.value);
    console.log(event.target.id);
    this.section=event.target.id
  }
  getNumber($event) {
    this.phone= $event;
  }
  checkMail() {
    this.checkEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.user.userEmail);
  }
  changeCountry(count) {
    this.cities = this.worldMapData.getAllStatesFromCountry(count);

  }
  changeCountry_(count) {
    this.cities_ = this.worldMapData.getAllStatesFromCountry(count);

  }
  changeRole(event){
    this.section=event.target.id
    this.user.role=event.target.value

  }
}

