import { Component, Input, OnChanges, EventEmitter,OnInit, Output, SimpleChanges } from '@angular/core';
import { Position } from '../../../models/Position.model';
import { OrganisationManagementService } from '../../../services/organisation-management.service';
import { UtilsService } from '../../../services/utils.service';


@Component({
  selector: 'ngx-position-list-table',
  templateUrl: './position-list-table.component.html',
  styleUrls: ['./position-list-table.component.scss']
})
export class PositionListTableComponent implements OnInit, OnChanges {

@Output() reloadPositionListEvent = new EventEmitter();
position :Position  = new Position();
positions_list ;
loading;
addNewPositionModal =false;


viewPositionModal=false;
titleHeader ="Ajouter une nouvelle position"
titleViewPoition=null;
viewPositionTable=[];
displayDeletePosition=false;

  constructor(private organisationManagementService: OrganisationManagementService , private utilsService: UtilsService,) { }
  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.getAllPositions();


  }
  addNewPosition() {
    this.position = new Position();

      //let racine = new Position();
      //racine.positionLabel = "Racine";
      //this.position.hierarchicalManagerPosition = racine;


    this.addNewPositionModal = true;

  }
  saveNewPosition(position : Position){

   position.company = position.company.companyId;
    position.businessUnit = position.businessUnit.businessUnitId;
    if (position.hierarchicalManagerPosition != null) {
      position.hierarchicalManagerPosition = position.hierarchicalManagerPosition.positionId;
    }
  
   position.positionCategory = position.positionCategory.positionCategoryId;
  position.evaluationCriteriaList.forEach(elm =>{
    delete elm.position;
  });
  /*position.functionalRoles.forEach(elem => {
    delete elem.hierarchicalManagerPosition.hierarchicalManagerPosition;
  });*/


   this.organisationManagementService.post(OrganisationManagementService.API_POSITION,position).subscribe(
    (response: any) => {
      this.addNewPositionModal = false;
      if(this.position.positionId == null || this.position.positionId == undefined ){
      this.utilsService.showToast(
        'success',
        'Position ajouté avec succés',
        `La position   ${this.position.positionLabel} a été ajouté avec succcés`);
      }else{
        this.utilsService.showToast(
          'success',
          'Position modifié avec succés',
          `La position   ${this.position.positionLabel} a été modifié avec succcés`);
      }

        this.initPosition();
        this.getAllPositions();
      },
    (error) => {
      this.utilsService.showToast(
        'danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la sauvegarde du position ${this.position.positionLabel}`
      );
      this.initPosition();
      this.addNewPositionModal = false;
    },
  );


  }
  getAllPositions(){
    const context = this;
    this.organisationManagementService.get(OrganisationManagementService.API_POSITION).subscribe( response => {
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
  editPosition(position){
    this.titleHeader ="Modifier une position"
    this.position = position;
    if(this.position.hierarchicalManagerPosition == null){
      let racine = new Position();
      racine.positionLabel = "Racine";
      this.position.hierarchicalManagerPosition = racine;
    }
    this.addNewPositionModal = true;
  }
  deletePosition(position){
    this.position = position;
    this.displayDeletePosition=true;
  }
    delPosition(){
    const context = this;
    this.organisationManagementService.delete(OrganisationManagementService.API_POSITION+this.position.positionId).subscribe( response => {
      if (response.MESSAGE === 'DELETED') {
        this.organisationManagementService.showToast('success',
          'Position supprimée avec succés',
          `La societé'  ${this.position.positionLabel} a été supprimée avec succcés`);
          this.displayDeletePosition=false;
          this.getAllPositions();
          this.initPosition();
      }
      },
      error => {
        console.log(error)
        context.organisationManagementService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du suppression de position`);
          this.displayDeletePosition=false;
          this.initPosition()
      });

  }
  initPosition(){
    this.position = new Position();
  }

  viewPosition(positionTable: Position){
   this.titleViewPoition= "Fiche de la position "+positionTable.positionLabel;
    console.log("-------------------", positionTable);
    this.position = positionTable;
   this.viewPositionModal=true;
  }

  hidePositionWindow() {
    this.addNewPositionModal = false;
    this.initPosition();
    this.getAllPositions();
  }

}
