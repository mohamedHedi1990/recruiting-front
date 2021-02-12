import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ICountry, IState, ICity } from 'country-state-city';
@Component({
  selector: 'ngx-add-new-company',
  templateUrl: './add-new-company.component.html',
  styleUrls: ['./add-new-company.component.scss']
})
export class AddNewCompanyComponent implements OnInit {

  @Input() company = {
    companyId: null,
    companyLabel: '',
    companyEmail: '',
    companyPhoneNumber: '',
    companyManagerName: '',
    companyDescription: '',
    companyAddress: '',
    companyUniqueIdentifier: '',
    updatedAt : '',
    createdAt : '',
    companyLogoUrl :'',
    companyCountry : '',
    companyCity :''
  };
  @Output() addNewCompanyEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  imagePath;
  imgURL: any;
  logo = null;
  messageLogoErrorType ='seulement les fichiers de type image sont autorisés!'
  showerrorTypeLogo = false;
  CheckTelHasError;
  checkEmail;
  worldMapData = require('city-state-country');;
  countriesList = this.worldMapData.getAllCountries();
 
  
  
  phone: any;
  
  cities: Array<any>;
  cities_: Array<any>;
  changeCountry(count) {
    this.cities = this.worldMapData.getAllStatesFromCountry(count);
    console.log(this.cities)

  }
  changeCountry_(count) {
    this.cities_ = this.worldMapData.getAllStatesFromCountry(count);
    console.log(this.cities_)

  }
 
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if(this.company.companyLogoUrl != null) {
      this.imgURL = this.company.companyLogoUrl;

    }
    if(this.company.companyCountry){
      this.cities  = this.worldMapData.getAllStatesFromCountry(this.company.companyCountry);
     }

     this.changeCountry(this.company.companyCountry);
     
     if(this.company.companyId==null){
       this.changeCountry('Tunisia');
       
       
       this.company.companyCity=this.cities[0].name;
 
     this.changeCountry_('Tunisia');
     this.company.companyCity=this.cities_[0].name;
   }
    
  }

  saveCompany() {

    const companyObject = {
      company: this.company,
      logo: this.logo
    }
    this.addNewCompanyEvent.emit(companyObject);
    console.log('------------------company object-------------------');
    console.log(companyObject)
  }

  cancel() {
    this.cancelEvent.emit();
  }

  checkCompanyValid(): boolean {
    var emailRegex = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i;
    
  
    return this.company.companyEmail == null || this.company.companyEmail === '' || !emailRegex.test(this.company.companyEmail)||
      this.company.companyLabel == null || this.company.companyLabel === '' ||
      this.company.companyUniqueIdentifier == null || this.company.companyUniqueIdentifier === '' ||
      this.company.companyManagerName == null || this.company.companyManagerName === '' ;
      
  }
  preview(files) {
    if (files.length === 0) {
      return;
    }
    this.logo = files[0];
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.showerrorTypeLogo = true;
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }
  validEmail(){
    
    var emailRegex = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i;
    this.checkEmail= emailRegex.test(this.company.companyEmail);
      
    
  }
  
  compareFn(a, b) {
    return a && b && a.name == b.name;
  }
  getNumber($event) {
    this.phone= $event;
  }
  onCountryChange($event) {
    this.company.companyPhoneNumber = null;

    this.CheckTelHasError = true;
    
  }
  telInputObject($event) {
    console.log("telInputObject", $event)
  }
  hasError($event) {
    this.CheckTelHasError = $event;
    console.log("haserror", $event)

  }
}
