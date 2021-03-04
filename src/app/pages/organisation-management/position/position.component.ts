import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem,  TreeNode } from 'primeng/api';
import { Position } from '../../../models/Position.model';
import { positionCategory } from '../../../models/positionCategory.model';
import { Tree } from '../../../models/Tree.model';
import { OrganisationManagementService } from '../../../services/organisation-management.service';
import { PerformanceManagementService } from '../../../services/performance-management.service';
import { SkillsManagementService } from '../../../services/skills-management.service';

@Component({
  selector: 'ngx-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {

  position : Position;
  category :positionCategory;
  tab_categories = [];
  categories ;
  selectedFile: TreeNode;
  positions_list = [];
 
  mode_table=true;
  constructor(private organisationManagementService: OrganisationManagementService ,
    private performanceManagementService : PerformanceManagementService,
    private skillsManagementService : SkillsManagementService,
    private router: Router,
    private _formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    
    

  }

  getAllPositions(){
  const context = this;
  this.organisationManagementService.get(OrganisationManagementService.API_POSITION_LITE).subscribe( response => {
      context.positions_list = response;
      console.log('-----------positions_list-----', this.positions_list)
     
    },
    error => {
      console.log(error)
      context.organisationManagementService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors du chargement des societés`);
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

  


  initPosition(){
    this.position = new Position();
  }
  initCategory(){
    this.category = new positionCategory();
  }

}
