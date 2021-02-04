import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem,  TreeNode } from 'primeng/api';
import { Tree } from '../../../models/Tree.model';

import { OrganisationManagementService } from '../../../services/organisation-management.service';

@Component({
  selector: 'ngx-business-unit',
  templateUrl: './business-unit.component.html',
  styleUrls: ['./business-unit.component.scss']
})
export class BusinessUnitComponent implements OnInit {

tab_companies =[];
companies: any[];
selectedFile: TreeNode;
items: MenuItem[];
addUnitWindow = false;
displayDeleteBusinessUnit = false;
businessUnit =null;
company = null;
action="add";
businessUnitName=""
constructor(private organisationManagementService: OrganisationManagementService ,
  private router: Router) { }

ngOnInit() {
  this.getAllCompanies();

  this.items = [
    {label: 'Ajouter', icon: 'pi pi-plus', command: (event) => {
      this.addUnitWindow = true ;
      
      if(this.selectedFile.data.companyId){
        this.company=this.selectedFile.data;
      }else{
        this.businessUnit = this.selectedFile.data;
      }
      this.action="add";
      
    }
  },
  {label: 'Editer', icon: 'pi pi-pencil', command: (event) => {
    this.addUnitWindow = true ;
    
    if(this.selectedFile.data.companyId){
      this.company=this.selectedFile.data;
    }else{
      this.businessUnit = this.selectedFile.data;
    }
    this.action="edit";
    
  }
},
    {label: 'Supprimer', icon: 'pi pi-times', command: (event) =>  {

      if(this.selectedFile.data.companyId){
        this.company=this.selectedFile.data;
        this.businessUnitName = this.company.companyLabel;
      }else{
        this.businessUnit = this.selectedFile.data;
        this.businessUnitName = this.businessUnit.businessUnitLabel;

      }
      this.action="delete";
     
    this.displayDeleteBusinessUnit = true;
    }
  }
   //, {label: 'Afficher', icon: 'pi pi-search', command: (event) =>  console.log('okk_______')}

];

}

getAllCompanies() {
  this.tab_companies =[];
  const context = this;
  this.organisationManagementService.get(OrganisationManagementService.API_COMPANY).subscribe( response => {
      context.companies = response;
      context.companies.forEach(company =>{

          let globalTree : TreeNode = new Tree(company, company.companyLabel , []);
          company.businessUnitList.forEach(companyBU => {
          globalTree.children.push(new Tree(companyBU, companyBU.businessUnitLabel, []));
          this.getUnits(companyBU , globalTree.children[globalTree.children.length-1].children);

      }); 
      
      this.tab_companies.push( Array(globalTree));
          
      });
      
      
    },
    error => {
      console.log(error)
      context.organisationManagementService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors du chargement des societés`);
    });

}

getUnits( businessUnit , children : any[]){
  if(businessUnit.subBusinessUnits.length==0 )
    return;
  // continue on the children
  
  businessUnit.subBusinessUnits.forEach(item => {
  
    children.push(new Tree(item ,item.businessUnitLabel, []));
    this.getUnits(item , children[children.length-1]);
    
    
  });
  
}

saveNewBusinessUnit(businessUnit){
  let url ='';
  if(this.company){
     url = OrganisationManagementService.API_COMPANY+this.company.companyId+'/add-business-unit';
  }
  if(this.businessUnit){
     url = OrganisationManagementService.API_BUSINESS_UNIT+this.businessUnit.businessUnitId+'/add-business-unit';
  }
  const context = this;
  this.organisationManagementService.put(url, businessUnit).subscribe( response => {
      console.log(response);
      
      this.getAllCompanies();
      this.addUnitWindow = false;

      if ( this.businessUnit.businessUnitId == null  ) {
        this.organisationManagementService.showToast('success',
          'Unité fonctionnelle ajoutée avec succés',
          `L'unité fonctionnelle  ${this.businessUnit.businessUnitLabel} a été ajoutée avec succcés`);
      } else {
        this.organisationManagementService.showToast('success',
          'Unité fonctionnelle modfiée avec succés',
          `L'unité fonctionnelle  ${this.businessUnit.businessUnitLabel} a été modifiée avec succcés`);
      }
         

      },
      error => {
        console.log(error)
        context.organisationManagementService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des societés`);
      });
}
  
  
editBusinessUnit(businessUnit){
  console.log('---------------------------//-----------------------',businessUnit);
  const context = this;
  this.organisationManagementService.put(OrganisationManagementService.API_BUSINESS_UNIT+businessUnit.businessUnitId, businessUnit).subscribe( response => {
      console.log(response);
      
      this.getAllCompanies();
      this.addUnitWindow = false;

      if ( this.businessUnit.businessUnitId == null  ) {
        this.organisationManagementService.showToast('success',
          'Unité fonctionnelle modifiée avec succés',
          `L'unité fonctionnelle  ${this.businessUnit.businessUnitLabel} a été modifiée avec succcés`);
      } 
          

      },
      error => {
        console.log(error)
        context.organisationManagementService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des societés`);
      });
}
delBusinessUnit(){

  const context = this;
 
  this.organisationManagementService.delete(OrganisationManagementService.API_BUSINESS_UNIT+this.businessUnit.businessUnitId).subscribe( response => {
    if (response.MESSAGE === 'DELETED') {
      this.organisationManagementService.showToast('success',
        'Unité fonctionnelle supprimée avec succés',
        `L'nité fonctionnelle''  ${this.businessUnit.businessUnitLabel} a été supprimée avec succcés`);
     
    }else if (response.MESSAGE === 'NOT_EMPTY') {
      this.organisationManagementService.showToast(
        "danger","Unité fonctionnelle non vide",
        `Des unités reliées à l'unité fonctionnelle  ${this.businessUnit.businessUnitLabel} ont été trouvés. Merci de les supprimer  avant de supprimer cette unité.`
      );
    }
    context.getAllCompanies();
    
    context.displayDeleteBusinessUnit = false;
  },
    error => {
      console.log(error)
      this.organisationManagementService.showToast('danger',
      'Erreur interne',
      `Un erreur interne a été produit lors de la suppression du l'unité ${this.businessUnit.businessUnitLabel}`);
      context.displayDeleteBusinessUnit = false;
    });

  
}


hideBusinessUnitWindow(){
  this.addUnitWindow = false;
}

initBusinessUnit(){
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
    updatedAt : '',
    createdAt : '', 
    businessUnitCity : '',
    businessUnitCountry : ''
  };
}

}