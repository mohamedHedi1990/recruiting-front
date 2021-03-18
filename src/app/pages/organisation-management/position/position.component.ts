import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem,  TreeNode } from 'primeng/api';
import { Position } from '../../../models/Position.model';
import { positionCategory } from '../../../models/positionCategory.model';
import { Tree } from '../../../models/Tree.model';
import { OrganisationManagementService } from '../../../services/organisation-management.service';
import { PerformanceManagementService } from '../../../services/performance-management.service';
import { SkillsManagementService } from '../../../services/skills-management.service';
import jsPDF from "jspdf";
import {DatePipe} from "@angular/common";
import {PositionListTableComponent} from "../position-list-table/position-list-table.component";

@Component({
  selector: 'ngx-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
  @ViewChild(PositionListTableComponent) positionListTableComponent!: PositionListTableComponent;

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
    private _formBuilder: FormBuilder,
    private datePipe:DatePipe
    ) { }

  ngOnInit(): void {
  }


  getAllPositions(){
  const context = this;
  this.organisationManagementService.get(OrganisationManagementService.API_POSITION).subscribe( response => {
      context.positions_list = response;

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

  exportPdf() {
    this.positionListTableComponent.exportPdf();
  }


  exportExcel() {
    this.positionListTableComponent.exportExcel();
  }

}
