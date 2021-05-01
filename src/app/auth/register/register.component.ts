import { BehaviorSubject } from 'rxjs';
import { FiliereService } from './../../services/filiere.service';
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
export class NgxRegisterComponent implements OnInit{
  user: User = new User()
  stagiaire: Stagiaire = new Stagiaire()
  condidat: Condidat = new Condidat()
  filiere: Filiere = new Filiere()
  checkEmail;
  phone: any;
  role: string
  CheckTelHasError;
  worldMapData = require('city-state-country');
  countriesList = this.worldMapData.getAllCountries();
  section :any='1'
  // section:string='1'
  sections:any=[]
  loginRequest: LoginRequest;
  cities: Array<any>;
  cities_: Array<any>;
  testAuth = false;
  authFailed = false;
  passwordconfirme: string = ''
  constructor(
    private router: Router,
    private filiereService: FiliereService,
     private serviceAuth: AuthServiceService) {

  }
ngOnInit(){
  console.log('section',this.section==='1');
  this.getAllFilieres()
}
  register() {
    console.log(this.role);

    var body={}
    if (this.role === 'condidat') {


       body =
      {
        userFirstName: this.user.userFirstName,
        userLastName: this.user.userLastName,
        userLogin: this.user.userLogin,
        userPassword: this.user.userPassword,
        userBirthDate: this.user.userBirthDate,
        userBirthCountry: this.user.userBirthCountry,
        userBirthCity: this.user.userBirthCity,
        userNRue: this.user.userNRue,
        userPays: this.user.userPays,
        userCity: this.user.userCity,
        userGender: this.user.userGender,
        userCivilStatus: this.user.userCivilStatus,
        userAddress: this.user.userAddress,
        userEmail: this.user.userEmail,
        userPhoneNumber: this.user.userPhoneNumber,
        candidatDiplome: this.condidat.candidatDiplome,
        candidatAnneeDiplome: this.condidat.candidatAnneeDiplome,
        candidatNumberExperience: this.condidat.candidatNumberExperience,
        candidatFiliere:  this.filiere


      }
    } else if (this.role === 'stagiaire') {
       body = {
        userFirstName: this.user.userFirstName,
        userLastName: this.user.userLastName,
        userLogin: this.user.userLogin,
        userPassword: this.user.userPassword,
        userBirthDate: this.user.userBirthDate,
        userBirthCountry: this.user.userBirthCountry,
        userBirthCity: this.user.userBirthCity,
        userNRue: this.user.userNRue,
        userPays: this.user.userPays,
        userCity: this.user.userCity,
        userGender: this.user.userGender,
        userCivilStatus: this.user.userCivilStatus,
        userAddress: this.user.userAddress,
        userEmail: this.user.userEmail,
        userPhoneNumber: this.user.userPhoneNumber,
        stagiaireEcole: this.stagiaire.stagiaireEcole,
        stagiaireFuturDiplome: this.stagiaire.stagiaireFuturDiplome,
        stagiaireNiveauEtude: this.stagiaire.stagiaireNiveauEtude,

        stagiaireFilier: this.filiere,


      }
    }
    console.log(body);

    this.serviceAuth.register( this.role,body).subscribe(
      (data: any) => {
        console.log(data);

        this.router.navigateByUrl("/");

      },
      (error) => {
        console.log(error);

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

    // this.section.next( event.target.id)
    this.section= event.target.id
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
    // this.section.next( event.target.id)
    this.section= event.target.id
    this.role = event.target.value

  }
  checkSection1Valid(): boolean {
    return this.user.userFirstName === '' || this.user.userLastName === '' ||
      this.user.userGender == '' || this.user.userCivilStatus === '' ||
      this.user.userBirthDate == '' || this.user.userBirthCity == null || this.user.userBirthCountry === '';
  }
  checkSection2Valid(): boolean {

    return this.user.userPhoneNumber == null  || this.user.userPays === undefined ||
       this.user.userAddress === undefined

  }
  checkSection3Valid(): boolean {
    return this.user.userEmail === '' || this.user.userLogin === '' ||
      this.passwordconfirme === '' || this.user.userPassword === '' || this.user.userPassword !== this.passwordconfirme;
  }
  checkCondidatValid(): boolean {
    return this.condidat.candidatDiplome === '' || this.condidat.candidatAnneeDiplome === '' ||
      this.condidat.candidatNumberExperience == null;
  }
  checkStagiaireValid(): boolean {
  //  console.log(this.stagiaire.stagiaireEcole !== '');
  //  console.log(this.stagiaire.stagiaireFuturDiplome !== '');
  //  console.log(this.stagiaire.stagiaireNiveauEtude !== '');
  //  console.log(this.filiere.domaineLabel.domaineLabel);

    return this.stagiaire.stagiaireEcole === '' || this.stagiaire.stagiaireFuturDiplome === '' ||
       this.stagiaire.stagiaireNiveauEtude ==='';
  }
  getAllFilieres(){
    this.filiereService.getAllFilieres().subscribe(arg => this.sections = arg);

  }
}

