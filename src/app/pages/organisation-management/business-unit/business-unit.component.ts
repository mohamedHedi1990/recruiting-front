import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
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
    
constructor(private organisationManagementService: OrganisationManagementService) { }

ngOnInit() {
  this.getAllCompanies();
}

getAllCompanies() {

  const context = this;
  this.organisationManagementService.get(OrganisationManagementService.API_COMPANY).subscribe( response => {
      context.companies = response;
      context.companies.forEach(company =>{

          let globalTree : TreeNode = new Tree(company.companyLabel , []);
          company.buisnessUnitList.forEach(companyBU => {
          globalTree.children.push(new Tree(companyBU.buisnessUnitLabel, []));
          this.getUnits(companyBU , globalTree.children[globalTree.children.length-1].children);

      }); 
      
      this.tab_companies.push( Array(globalTree));
          
      });
      console.log("************************************************")
      console.log(this.tab_companies)
      
    },
    error => {
      console.log(error)
      context.organisationManagementService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors du chargement des societés`);
    });

}

getUnits( buisnessUnit , children : any[]){
  if(buisnessUnit.subBuisnessUnits.length==0 )
    return;
  // continue on the children
  
  buisnessUnit.subBuisnessUnits.forEach(item => {
  
    children.push(new Tree(item.buisnessUnitLabel, []));
    this.getUnits(item , children[children.length-1]);
    
    
  });
  
}
    
}
