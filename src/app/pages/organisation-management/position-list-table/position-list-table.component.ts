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
@Input() positions_list ;
@Output() reloadPositionListEvent = new EventEmitter();
position :Position  = new Position();
loading;
addNewPositionModal =false;
viewPositionModal=false;
titleHeader ="Ajouter une nouvelle position"
titleViewPoition=null;
viewPositionTable=[];
  constructor(private organisationManagementService: OrganisationManagementService , private utilsService: UtilsService,) { }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {

  }
  addNewPosition(){
    this.addNewPositionModal = true;
   
  }
  saveNewPosition(position){
   console.log("---------save new position --------------");
   
   this.organisationManagementService.post(OrganisationManagementService.API_POSITION,position).subscribe(
    (response: any) => {
      this.addNewPositionModal = false;
      this.utilsService.showToast(
        'success',
        'Position ajouté avec succés',
        `La position   ${this.position.positionLabel} a été ajouté avec succcés`);
    
    },
    (error) => {
      this.utilsService.showToast(
        'danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la sauvegarde du position ${this.position.positionLabel}`
      );
    },
  );

  }
  editPosition(position){
    this.titleHeader ="Modifier une position"
    this.position = position;
    this.addNewPositionModal = true;
  }
  deletePosition(position){}
  initPosition(){
    this.position = new Position();
  }
  viewPosition(positionTable){
   this.titleViewPoition= "Fiche de la position "+positionTable.positionLabel +":";
   console.log("-------------------",positionTable)
this.viewPositionTable.push(positionTable);
   this.viewPositionModal=true;
  }
}
