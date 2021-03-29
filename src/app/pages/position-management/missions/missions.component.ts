import { Component, OnInit,ChangeDetectorRef, } from '@angular/core';
import { UtilsService } from "../../../services/utils.service"
@Component({
  selector: 'ngx-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {
  positions: any[];
  loading = false;
  constructor(private UtilsService: UtilsService,private ref:ChangeDetectorRef) {

  }

  
  ngOnInit(): void {
     this.getAllPositions();
  }

 
 

  getAllPositions() {

    const context = this;
    this.UtilsService.get(UtilsService.API_POSITION).subscribe( response => {
        context.positions = response;
        console.log(response);
        },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des positions`);
      });

  }
 
  annulerOperation(position){
    this.getAllPositions();
this.ref.detectChanges();
  }
validerOperation(position){
    this.UtilsService.put(UtilsService.API_POSITION, position).subscribe( response => {
       
        this.getAllPositions();
      
        
          this.UtilsService.showToast('success',
            'Mission modfiée avec succés',
            `La mission  de la position ${position.positionlabel} a été modifiée avec succcés`);
        
       } 
      
      ,
      error => {
        console.log(error);
        this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de modification de la mission de la position ${position.positionLabel}`); });

        
  }
}




