import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogService } from 'primeng/dynamicdialog';
import { SmartTableData } from '../../../@core/data/smart-table';
import { OrganisationManagementService } from '../../../services/organisation-management.service';

@Component({
  selector: 'ngx-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  companies: any[];
  loading = false;
  showCompanyWindow = false;
  displayDeleteCompany = false;
  company = {
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
  titleHeader = "Ajouter une société";


  constructor(private service: SmartTableData, private organisationManagementService: OrganisationManagementService,
              public dialogService: DialogService,
               private sanitizer: DomSanitizer) {

  }


  ngOnInit(): void {
    this.initCompany();
    this.getAllCompanies();
    
  }

 
  getAllCompanies() {

    const context = this;
    this.organisationManagementService.get(OrganisationManagementService.API_COMPANY).subscribe( response => {
        context.companies = response;
        
        
        
      },
      error => {
        console.log(error)
        context.organisationManagementService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des societés`);
      });

  }

  saveNewCompany(companyObject) {
    delete this.company.createdAt;
    delete this.company.updatedAt;
    const context = this;
    this.company=companyObject.company;
   
    this.organisationManagementService.post(OrganisationManagementService.API_COMPANY, this.company).subscribe( 
      response => {
       if(companyObject.logo!=null){
        this.saveCompanyLogo(response.companyId, companyObject.logo);
       }else{
        this.hideCompanyWindow();
       
        if ( this.company.companyId == null) {
          this.organisationManagementService.showToast('success',
            'Societé ajoutée avec succés',
            `La société  ${this.company.companyLabel} a été ajoutée avec succcés`);
        } else {
          this.organisationManagementService.showToast('success',
            'Societé modfiée avec succés',
            `La société  ${this.company.companyLabel} a été modifiée avec succcés`);
        }
        this.getAllCompanies();
        this.initCompany();
       } 
      
    
      },
      error => {this.organisationManagementService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la souvegarde du societé ${this.company.companyLabel}`); });

  }

  saveCompanyLogo(companyId, logo) {
    
    const formData = new FormData();
    formData.append('file', logo);
    this.organisationManagementService.post(OrganisationManagementService.API_FILE + 'ADD_COMPANY_PICTURE/'+companyId, formData).subscribe(response => {
      this.hideCompanyWindow();
        if ( this.company.companyId == null) {
          this.organisationManagementService.showToast('success',
            'Societé ajoutée avec succés',
            `Le societé  ${this.company.companyLabel} a été ajoutée avec succcés`);
        } else {
          this.organisationManagementService.showToast('success',
            'Societé modfiée avec succés',
            `Le societé  ${this.company.companyLabel} a été modifiée avec succcés`);
        }
        this.getAllCompanies();
        this.initCompany();
    },  error => {this.organisationManagementService.showToast('danger',
    'Erreur interne',
    `Un erreur interne a été produit lors de la souvegarde du societé ${this.company.companyLabel}`); });
  }







  editCompany(company){
    this.company = company ;
    this.titleHeader = "Modifier une société";
    this.showCompanyWindow = true;
  }
  deleteCompany(company) {
    
    this.company = company;
    this.displayDeleteCompany = true;

  }

  delCompany(){

    const context = this;
   
    this.organisationManagementService.delete(OrganisationManagementService.API_COMPANY+this.company.companyId).subscribe( response => {
      if (response.MESSAGE === 'DELETED') {
        this.organisationManagementService.showToast('success',
          'Societé supprimé avec succés',
          `La societé'  ${this.company.companyLabel} a été supprimée avec succcés`);
       
      }else if (response.MESSAGE === 'NOT_EMPTY') {
        this.organisationManagementService.showToast(
          "danger","Des unités fonctionelles rattachées à cette société",
          `Des unités fonctionelles rattachées à la societé  ${this.company.companyLabel} ont été trouvés. Merci de les supprimer avant de supprimer cette societé.`
        );
      }
      context.getAllCompanies();
      context.initCompany();
      context.displayDeleteCompany = false;
    },
      error => {
        console.log(error)
        this.organisationManagementService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression du societé ${this.company.companyLabel}`);
        context.displayDeleteCompany = false;
      });

    
  }
  addNewCompany(){
    this.showCompanyWindow = true;
  }
  hideCompanyWindow() {
    this.showCompanyWindow = false;
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
      updatedAt : '',
      createdAt : '',
      companyLogoUrl :'',
      companyCity : '',
    companyCountry : ''
      
    };
  }

}