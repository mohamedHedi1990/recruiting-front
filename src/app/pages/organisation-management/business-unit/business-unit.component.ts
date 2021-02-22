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
mode ;
moved_node ;
destination_node;
constructor(private organisationManagementService: OrganisationManagementService ,
  private router: Router) { }

ngOnInit() {
  this.getAllCompanies();
this.mode ="horizontal";
 

}

getAllCompanies() {
  this.tab_companies =[];
  const context = this;
  this.organisationManagementService.get(OrganisationManagementService.API_COMPANY).subscribe( response => {
      context.companies = response;
      context.companies.forEach(company =>{

          let globalTree : TreeNode = new Tree(company, company.companyLabel , []);
          globalTree.expandedIcon= "pi pi-home";
          globalTree.collapsedIcon = "pi pi-home";
          company.businessUnitList.forEach(companyBU => {
          globalTree.children.push(new Tree(companyBU, companyBU.businessUnitLabel, []));
          this.getUnits(companyBU , globalTree.children[globalTree.children.length-1].children);

      }); 
      
      this.tab_companies.push( Array(globalTree));
          
      });
      
      
      this.tab_companies.forEach( node => {
        
        this.expandRecursive(node[0], true);
    } );
    
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
    this.getUnits(item , children[children.length-1].children);
    
    
  });
  
}

saveNewBusinessUnit(businessUnit){
  delete businessUnit.createdAt;
  delete businessUnit.updatedAt;
  let url ='';
  if(this.selectedFile.data.companyId){
     url = OrganisationManagementService.API_COMPANY+this.company.companyId+'/add-business-unit';
  }
  if(this.selectedFile.data.businessUnitId){
     url = OrganisationManagementService.API_BUSINESS_UNIT+this.businessUnit.businessUnitId+'/add-business-unit';
  }
  const context = this;
  this.organisationManagementService.put(url, businessUnit).subscribe( response => {
      
      
      this.getAllCompanies();
      this.addUnitWindow = false;

      if ( businessUnit.businessUnitId == null  ) {
        this.organisationManagementService.showToast('success',
          'Unité fonctionnelle ajoutée avec succés',
          `L'unité fonctionnelle  ${businessUnit.businessUnitLabel} a été ajoutée avec succcés`);
      } else {
        this.organisationManagementService.showToast('success',
          'Unité fonctionnelle modfiée avec succés',
          `L'unité fonctionnelle  ${businessUnit.businessUnitLabel} a été modifiée avec succcés`);
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
  delete businessUnit.createdAt;
  delete businessUnit.updatedAt;
  const context = this;

  this.organisationManagementService.put(OrganisationManagementService.API_BUSINESS_UNIT+businessUnit.businessUnitId, businessUnit).subscribe( response => {
      
      
      this.getAllCompanies();
      this.addUnitWindow = false;

      if ( businessUnit.businessUnitId == null  ) {
        this.organisationManagementService.showToast('success',
          'Unité fonctionnelle modifiée avec succés',
          `L'unité fonctionnelle  ${businessUnit.businessUnitLabel} a été modifiée avec succcés`);
      } 
          

      },
      error => {
        console.log(error)
        context.organisationManagementService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des societés`);
          this.addUnitWindow = false;

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
private expandRecursive(node:TreeNode, isExpand:boolean){
  node.expanded = isExpand;
  if (node.children.length == 0){
    node.expanded = !isExpand;
  }
 
  if (node.children){
      node.children.forEach( childNode => {
          this.expandRecursive(childNode, isExpand);
      } );
  }
}


public nodeMenu(event, node) {
  console.log( node.data);
  this.items = [];
  if (node.data.businessUnitId) {

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
 }else{
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
  
    
  }
   //, {label: 'Afficher', icon: 'pi pi-search', command: (event) =>  console.log('okk_______')}

];
 }
   
  
  // this.rightMenu.show();
  return false;
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

toggleMode(mode){
    
  var mode_card = document.getElementById('mode_card');
  var mode_list = document.getElementById('mode_list');
  let url ;
  if(mode == 'card'){
    
    this.mode="horizontal";

   
    mode_card.style.backgroundColor = "#c1bbbb";
    mode_list.style.backgroundColor = "#d0d0d0";
    
  }
  if(mode == 'list'){
    this.mode="";
    mode_list.style.backgroundColor = "#c1bbbb";
    mode_card.style.backgroundColor = "#d0d0d0";
  }
}

onDragStart($event, node):void{
  //console.log('onDragStart' ,node );
  this.moved_node = node;
}
onDragEnd($event, node):void{
  //console.log('onDragEnd' ,node );
}
onDrop($event, node):void{
//  console.log('onDrop' ,node );
  this.destination_node = node;
  if(this.destination_node.data.businessUnitId){
  this.organisationManagementService.put(OrganisationManagementService.API_BUSINESS_UNIT+this.moved_node.data.businessUnitId+'/moved-to/'+this.destination_node.data.businessUnitId, null).subscribe(
    Response=>{
      this.getAllCompanies();
     
        
        this.organisationManagementService.showToast('success',
          'Unité fonctionnelle modfiée avec succés',
          `L'unité fonctionnelle  ${this.moved_node.data.businessUnitLabel} a été déplacée avec succcés`);
      
    },
    error =>{
      console.log(error)
      this.organisationManagementService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors du chargement des societés`);
    })
  }

  if(this.destination_node.data.companyId){
    this.organisationManagementService.put(OrganisationManagementService.API_BUSINESS_UNIT+this.moved_node.data.businessUnitId+'/moved-to-company/'+this.destination_node.data.companyId, null).subscribe(
      Response=>{
        this.getAllCompanies();
       
          
          this.organisationManagementService.showToast('success',
            'Unité fonctionnelle modfiée avec succés',
            `L'unité fonctionnelle  ${this.moved_node.data.businessUnitLabel} a été déplacée avec succcés`);
        
      },
      error =>{
        console.log(error)
        this.organisationManagementService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des societés`);
      })
    }
}
onDragEnter($event, node):void{
 // console.log('onDragEnter',node );
}
onDragLeave($event, node):void{
 // console.log('onDragLeave' ,node );
}


onSelect($event): void {
  if ($event.node.leaf === false) {
      return;
  }
  this.selectedFile = $event.node;
 // console.log(this.selectedFile);
}
/*
onDragStart($event, node): void {
  if (node.leaf === false) {
      return;
  }
  this.selectedEquipment = node;
  console.log('onDragStart');
  console.log(this.selectedEquipment);
}

onDragEnd($event, node): void {
  console.log('onDragEnd');
}

onDrop($event, node): void {
  console.log('onDrop');
}

onDragEnter($event, node): void {
  console.log('onDragEnter');
}

onDragLeave($event, node): void {
  console.log('onDragLeave');
}
*/

}