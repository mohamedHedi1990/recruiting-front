import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrganisationManagementService} from "../../../services/organisation-management.service";

@Component({
  selector: 'ngx-position-function-sheet',
  templateUrl: './position-function-sheet.component.html',
  styleUrls: ['./position-function-sheet.component.scss']
})
export class PositionFunctionSheetComponent implements OnInit {

  @Input() functionCard: any;
  @Output() retourEvent = new EventEmitter();
  attribNumber=2;

  constructor(private organisationService:OrganisationManagementService) { }

  ngOnInit(): void {
    if(this.functionCard.length > 1){
      this.attribNumber=this.functionCard.length;
    }
  }

  retour(){
    this.retourEvent.emit();
  }

}
