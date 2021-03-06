import { Component , EventEmitter , Input , OnChanges , OnInit , Output , SimpleChanges } from '@angular/core';
import { BusinessUnit } from '../../../models/BusinessUnit.model';
import { Company } from '../../../models/Company.model';
import { OrganisationManagementService } from '../../../services/organisation-management.service';
import { UtilsService } from '../../../services/utils.service';

@Component ({
  selector : 'ngx-add-new-business-unit',
  templateUrl : './add-new-business-unit.component.html',
  styleUrls : ['./add-new-business-unit.component.scss']
})
export class AddNewBusinessUnitComponent implements OnInit , OnChanges {

  @Input () businessUnit : BusinessUnit ;
  @Input () companies : Company [];
  companyBuisnessUnits : BusinessUnit [];
    /*= {
  businessUnitId: null,
  businessUnitLabel: '',
  businessUnitCode: '',
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
};*/
/*@Input ()  company = {
  companyId : null,
  companyLabel : '',
  companyEmail : '',
  companyPhoneNumber : '',
  companyManagerName : '',
  companyDescription : '',
  companyAddress : '',
  companyUniqueIdentifier : '',
  updatedAt : '',
  createdAt : '',
  companyLogoUrl : '',
  companyCity : '',
  companyCountry : ''
};*/
@Input ()  action ;
@Output () addNewBusinessUnitEvent = new EventEmitter ();
@Output () editBusinessUnitEvent = new EventEmitter ();

@Output () cancelEvent = new EventEmitter ();
displayAddUnit = true;
addUnit = true;

worldMapData = require ('city-state-country'); ;
countriesList = this.worldMapData .getAllCountries ();
cities : Array <any>;
comedNode = null;
changeCountry (count ) {
  this.cities  = this.worldMapData .getAllStatesFromCountry (count );

}
  constructor(private organisationManagementService : OrganisationManagementService ,
    private utilsService : UtilsService ) { }
  ngOnChanges (changes : SimpleChanges ): void {
    if (this.businessUnit .company == null) {
      if (this.companies .length !== 0) {
        this.businessUnit .company == this.companies [0];
      }

    }
    this.getAllBuisnessUnitForCompany ();

    }

ngOnInit (): void {
  if (this.businessUnit .company == null) {
    if (this.companies .length !== 0) {
      this.businessUnit .company == this.companies [0];
    }

  }
  this.getAllBuisnessUnitForCompany ();


  /*if (this.action =="add" ) {
    this.initBusinessUnit ();
    this.initCompany ();

  }
  if(this.action =="edit"){
    if(this.businessUnit ){
      this.headerTitle = "Modifer l'unité fonctionnelle "+this.businessUnit .businessUnitLabel ;
    }
  }*/






  }

  getAllBuisnessUnitForCompany () {
    this.organisationManagementService .get (OrganisationManagementService .API_COMPANY + this.businessUnit .company .companyId + "/business-unit-list").subscribe (response => {
      const companyBuisnessUnits : BusinessUnit [] = response ;
      this.companyBuisnessUnits = companyBuisnessUnits.filter(buisnessUnit => buisnessUnit.businessUnitLabel !== this.businessUnit.businessUnitLabel);
      if (this.businessUnit.businessUnitId == null && this.companyBuisnessUnits.length !== 0) {
        this.businessUnit.parentBusinessUnit = this.companyBuisnessUnits[0];
      }
    }, error => {
      this.utilsService .showToast (
        "danger",
        "Erreur interne",
        `Un erreur interne a été produit lors du chargement de la liste des unités organisationelles reliées à la société selectionnée`
      );
    });
  }

saveBusinessUnit () {
     this.addNewBusinessUnitEvent .emit (this.businessUnit );
  /*if(this.action == 'edit')
      this.editBusinessUnitEvent .emit (this.businessUnit );*/

}

checkBusinessUnitValid (): boolean{
  return this.businessUnit .businessUnitLabel == null || this.businessUnit .businessUnitLabel === '' ||
    this.businessUnit .businessUnitCode == null || this.businessUnit .businessUnitCode === '' ||
    this.businessUnit .company == null ;
}
cancel (){
  this.cancelEvent .emit ();
}
  delUnit () { }
  compareCompany (a , b ) {
    return a && b && a .companyId === b .companyId ;

  }
  compareBU (a , b ) {
    if (a == null && b == null) return true;
    return a && b && a .businessUnitId == b .businessUnitId ;

  }
/*validEmail (event ){
  let email = event .target .value ;
  var emailRegex = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i;
  if(!emailRegex .test (email ))
    this.company .companyEmail = '';

}*/
/*initCompany () {
  this.company = {
    companyId : null,
    companyLabel : '',
    companyEmail : '',
    companyPhoneNumber : '',
    companyManagerName : '',
    companyDescription : '',
    companyAddress : '',
    companyUniqueIdentifier : '',
    companyLogoUrl : '',
    companyCity : '',
    companyCountry : '',
    updatedAt : '',
    createdAt : '',


  };
}*/
/*initBusinessUnit () {
  this.businessUnit = {
    businessUnitId : null,
    businessUnitLabel : '',
    businessUnitEmail : '',
    businessUnitPhoneNumber : '',
    businessUnitManagerName : '',
    businessUnitDescription : '',
    businessUnitAddress : '',
    businessUnitUniqueIdentifier : '',
    parentBusinessUnit : null,
    businessUnitCity : '',
    businessUnitCountry : '',
    updatedAt : '',
    createdAt : '',

  };
}*/
}
