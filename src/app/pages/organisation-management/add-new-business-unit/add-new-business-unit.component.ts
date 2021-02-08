import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-add-new-business-unit',
  templateUrl: './add-new-business-unit.component.html',
  styleUrls: ['./add-new-business-unit.component.scss']
})
export class AddNewBusinessUnitComponent implements OnInit {

@Input() businessUnit = {
  businessUnitId: null,
  businessUnitLabel: '',
  businessUnitEmail: '',
  businessUnitPhoneNumber: '',
  businessUnitManagerName: '',
  businessUnitDescription: '',
  businessUnitAddress: '',
  businessUnitUniqueIdentifier: '',
  parentBusinessUnit :null,
  businessUnitCity : '',
  businessUnitCountry : '',
  updatedAt : '',
  createdAt : '', 
};
@Input()  company = {
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
  companyCity : '',
  companyCountry : ''
};
@Input()  action;
@Output() addNewBusinessUnitEvent = new EventEmitter();
@Output() editBusinessUnitEvent = new EventEmitter();

@Output() cancelEvent = new EventEmitter();
displayAddUnit = true;
addUnit = true;

worldMapData = require('city-state-country');;
countriesList = this.worldMapData.getAllCountries();
cities: Array<any>;
comedNode =null;
changeCountry(count) {
  this.cities  = this.worldMapData.getAllStatesFromCountry(count);
  
}
constructor() { }
headerTitle="Ajouter une unité fonctionnelle"
ngOnInit(): void {

  
 
  if (this.action=="add" ) {
    this.initBusinessUnit();
    this.initCompany();
    
  }
  if(this.action=="edit"){
    if(this.businessUnit){
      this.headerTitle ="Modifer l'unité fonctionnelle "+this.businessUnit.businessUnitLabel;
    }
  }
  
  
  

  
  
}
saveBusinessUnit() {
  if(this.action =='add')
     this.addNewBusinessUnitEvent.emit(this.businessUnit);
  if(this.action == 'edit')
      this.editBusinessUnitEvent.emit(this.businessUnit);
  
}

checkBusinessUnitValid(): boolean{
  return this.businessUnit.businessUnitLabel == null || this.businessUnit.businessUnitLabel === '';
}
cancel(){}
delUnit(){}
validEmail(event){
  let email = event.target.value;
  var emailRegex = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i;
  if(!emailRegex.test(email))
    this.company.companyEmail ='';
  
}
initCompany() {
  this.company = {
    companyId: null,
    companyLabel: '',
    companyEmail: '',
    companyPhoneNumber: '',
    companyManagerName: '',
    companyDescription: '',
    companyAddress: '',
    companyUniqueIdentifier: '',
    companyLogoUrl :'',
    companyCity : '',
    companyCountry : '',
    updatedAt : '',
    createdAt : '',
    
    
  };
}
initBusinessUnit() {
  this.businessUnit = {
    businessUnitId: null,
    businessUnitLabel: '',
    businessUnitEmail: '',
    businessUnitPhoneNumber: '',
    businessUnitManagerName: '',
    businessUnitDescription: '',
    businessUnitAddress: '',
    businessUnitUniqueIdentifier: '',
    parentBusinessUnit :null,
    businessUnitCity : '',
    businessUnitCountry : '',
    updatedAt : '',
    createdAt : '', 
    
  };
}
}
