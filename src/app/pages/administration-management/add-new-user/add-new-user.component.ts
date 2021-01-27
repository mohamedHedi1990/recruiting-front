import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import csc from 'country-state-city'

// Import Interfaces`
import { ICountry, IState, ICity } from 'country-state-city'
@Component({
  selector: 'ngx-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {
  emailtouch=false;
  @Input() user = {
    userId: null,
    userRegistrationNumber: '',
    userFirstName: '',
    userLastName: '',
    userPictureUrl: '',
    userBirthDate:null,
    userGender: '',
    userBirthCountry: '',
    userBirthCity: '',
    userHirringDate: null,
    userAddress: '',
    userEmail: '',
    userPhoneNumber: '',
    userLogin: '',
    userPassword: '',
    userCivilStatus: '',
    isBlocked: '',
  };
  imagePath;
   imgURL :any;
userPicture = null;
messageUserPictureErrorType ='seulement les fichiers de type image sont autorisés!'
  showerrorTypeUserPicture = false;
  @Output() addNewUserEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
 
   worldMapData = require('city-state-country');
    countriesList = this.worldMapData.getAllCountries();
x:any;
  constructor() { }
 
  cities: Array<any>;
  changeCountry(count) {
    this.cities  = this.worldMapData.getAllStatesFromCountry(count);
    console.log(this.cities)
 
  }

  ngOnInit(): void {
    this.imgURL ='./../../assets/images/user.jpg';
  }
  
  saveUser() {
    
    const userObject = {
      user: this.user,
      userPicture: this.userPicture
    }
   this.addNewUserEvent.emit(userObject);
  }

  cancel() {
    this.cancelEvent.emit();
  }

  checkUserValid(): boolean {
    return this.user.userRegistrationNumber == null || this.user.userRegistrationNumber === '' &&
      this.user.userFirstName == null || this.user.userFirstName === '' &&
      this.user.userLastName == null || this.user.userLastName === '' &&
      this.user.userBirthDate == null || this.user.userBirthDate === '' &&
      this.user.userGender == null || this.user.userGender === '' &&
      this.user.userBirthCountry == null || this.user.userBirthCountry === '' &&
      this.user.userBirthCity == null || this.user.userBirthCity === '' &&
      this.user.userHirringDate == null || this.user.userHirringDate === '' &&
      this.user.userAddress == null || this.user.userAddress === '' &&
      this.user.userEmail == null || this.user.userEmail === '' &&
      this.user.userPhoneNumber == null || this.user.userPhoneNumber === '' &&
      this.user.userLogin == null || this.user.userLogin === '' &&
      this.user.userPassword == null || this.user.userPassword === '' &&
      
      this.user.userCivilStatus == null || this.user.userCivilStatus === '';
  }
  preview(files){
    if (files.length === 0) {
      return;
    }
    this.userPicture = files[0];
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.showerrorTypeUserPicture= true;
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }
  generatePassword(){
    function makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
   }
   this.user.userPassword = makeid(15) ;
  }
  checkemailValid(){
    
   
 }}
