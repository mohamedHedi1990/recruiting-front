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
 
  address ={
    nRue :null,
    pays :null,
    ville :null

  }
  worldMapData = require('city-state-country');;
  countriesList = this.worldMapData.getAllCountries();
  cities: Array<any>;
  changeCountry(count) {
    this.cities  = this.worldMapData.getAllStatesFromCountry(count);
    console.log(this.cities)
 
  }
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if(this.company.companyLogoUrl != null) {
      this.imgURL = this.company.companyLogoUrl;

    }
    if(this.company.companyAddress){
     let array = this.company.companyAddress.split(",");
     this.address.pays = array[2]
     this.address.ville = array[1];
     this.address.nRue = array[0];
      

    }

  }

  saveCompany() {
    this.company.companyAddress=this.address.nRue+','+this.address.ville+','+this.address.pays+'.'
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
  validEmail(event){
    let email = event.target.value;
    console.log(email)
    var emailRegex = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i;
    if(!emailRegex.test(email))
      this.company.companyEmail ='';
    
  }
}
