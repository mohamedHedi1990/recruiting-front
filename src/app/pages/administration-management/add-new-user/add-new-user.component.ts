import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'ngx-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {
  emailtouch=false;
  @Input() user = {
    userId: null,
    userRegistrationNumber: null,
    userFirstName: null,
    userLastName: null,
    userPictureUrl: null,
    userBirthDate:null,
    userGender: null,
    userBirthCountry: null,
    userBirthCity: null,
    userHirringDate: null,
    userAddress: null,
    userEmail: null,
    userPhoneNumber: null,
    userLogin: null,
    userPassword: null,
    userCivilStatus: null,
    isBlocked: null,
    createdAt :null,
    updatedAt:null
  };
  imagePath;
   imgURL =null;
userPicture = null;
messageUserPictureErrorType ='seulement les fichiers de type image sont autorisés!'
  showerrorTypeUserPicture = false;
  adresse ={
    nRue :null,
    pays :null,
    ville :null

  }

  @Output() addNewUserEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
 
   worldMapData = require('city-state-country');
    countriesList = this.worldMapData.getAllCountries();
checkEmail;

CheckTelHasError;
  imgURL2: string | ArrayBuffer;

  constructor(private sanitizer: DomSanitizer) { }
 
  cities: Array<any>;
  changeCountry(count) {
    this.cities  = this.worldMapData.getAllStatesFromCountry(count);
    console.log(this.cities)
 
  }

  ngOnInit(): void {
   this.imgURL2=this.user.userPictureUrl;
   if(this.imgURL2==null ||this.imgURL2 ==='' ){
    this.imgURL ='./../../assets/images/user.jpg';
    }
    else{
      this.imgURL=null;
    }}
  
  saveUser() {
    this.user.userAddress=this.adresse.nRue+','+this.adresse.ville+','+this.adresse.pays+'.'
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
     // this.user.userLogin == null || this.user.userLogin === '' &&
       this.user.userPassword == null || this.user.userPassword === '';
      // &&
      
      // this.user.userCivilStatus == null || this.user.userCivilStatus === '';
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
      if(this.user.userPictureUrl!=null){
        this.imgURL2=  reader.result
       }else{
      this.imgURL = reader.result;
      }
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
   this.user.userPassword = makeid(8) ;
  }
  checkemailValid(){
    
   
 }
 initUser(){
  this.user = {
    userId: null,
    userRegistrationNumber: null,
    userFirstName: null,
    userLastName: null,
    userPictureUrl: null,
    userBirthDate:null,
    userGender: null,
    userBirthCountry: null,
    userBirthCity: null,
    userHirringDate: null,
    userAddress: null,
    userEmail: null,
    userPhoneNumber: null,
    userLogin: null,
    userPassword: null,
    userCivilStatus: null,
    isBlocked: null,
    createdAt :null,
    updatedAt:null
  };
 }
 checkMail(){
   this.checkEmail=/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.user.userEmail);
 }
 onCountryChange($event){
   this.user.userPhoneNumber=null;
   
   this.CheckTelHasError=false;
   console.log("onCountryChange",$event)
 }
 telInputObject($event){
  console.log("telInputObject",$event) 
 }
 hasError($event){
   this.CheckTelHasError=$event;
   console.log("haserror",$event)
  
 }
 getNumber($event){
   console.log("userPhone",this.user.userPhoneNumber)
  console.log("getNumber",$event) ;
 }

}
