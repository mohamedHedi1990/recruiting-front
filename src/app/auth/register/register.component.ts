import { Filiere } from './../../models/filiere';
import { Condidat } from './../../models/condidat';
import { Stagiaire } from './../../models/stagiaire';
import { User } from './../../models/user';
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
  user: User = new User()
  stagiaire: Stagiaire = new Stagiaire()
  condidat: Condidat = new Condidat()
  filiere: Filiere = new Filiere()
  checkEmail;
  phone: any;
  role: string
  worldMapData = require('city-state-country');
  CheckTelHasError;
  countriesList = this.worldMapData.getAllCountries();
  section: any = '1'
  loginRequest: LoginRequest;
  cities: Array<any>;
  cities_: Array<any>;
  testAuth = false;
  authFailed = false;
  passwordconfirme: string = ''
  constructor(
    private router: Router, private serviceAuth: AuthServiceService) {

  }

  register() {
    console.log(this.role);

    this.serviceAuth.register(this.user, this.role).subscribe(
      (data: JwtResponse) => {
        this.router.navigateByUrl("/recruiting");
        this.testAuth = false;
      },
      (error) => {
        console.log("error");
        this.testAuth = true;
      }
    )
  }
  hasError($event) {
    this.CheckTelHasError = $event;

  }
  onCountryChange($event) {
    this.user.userPhoneNumber = null;

    this.CheckTelHasError = true;
  }
  next(event) {
    // this.loginRequest.role=event.target.value
    console.log(event.target.value);
    console.log(event.target.id);
    this.section = event.target.id
  }
  getNumber($event) {
    this.phone = $event;
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
  changeRole(event) {
    this.section = event.target.id
    this.role = event.target.value

  }
  checkSection1Valid(): boolean {
    return this.user.userFirstName === '' || this.user.userLastName === '' ||
      this.user.userGender == '' || this.user.userCivilStatus === '' ||
      this.user.userBirthDate == '' || this.user.userBirthCity == null || this.user.userBirthCountry === '';
  }
  checkSection2Valid(): boolean {
    return this.user.userPhoneNumber == null || this.user.userPays === '' ||
      this.user.userCity == '' || this.user.userAddress === ''

  }
  checkSection3Valid(): boolean {
    return this.user.userEmail ==='' || this.user.userLogin === '' ||
      this.passwordconfirme ==='' ||  this.user.userPassword ==='' || this.user.userPassword !== this.passwordconfirme;
  }
  checkCondidatValid(): boolean {
    return this.condidat.candidatDiplome ==='' || this.condidat.candidatAnneeDiplome === '' ||
       this.condidat.candidatNumberExperience ==null ;
  }
  checkStagiaireValid(): boolean {
    return this.stagiaire.stagiaireEcole ==='' || this.stagiaire.stagiaireFuturDiplome === '' ||
       this.stagiaire.stagiaireNiveauEtude ==null ;
  }
}

