import { Component, OnInit } from '@angular/core';

import { UtilsService } from "../../../services/utils.service";
@Component({
  selector: 'ngx-attributions',
  templateUrl: './attributions.component.html',
  styleUrls: ['./attributions.component.scss']
})
export class AttributionsComponent implements OnInit {
  positions: any[];
  loading = false;
  position=null;
  line = {
    attributionId: null,
    attributionLabel: null,
    attributionCode: null,
    position:null,
  };
  constructor(private UtilsService: UtilsService) { }

  ngOnInit(): void {
    
    this.getAllPositions();
  }
  getAllPositions() {

    const context = this;
    this.UtilsService.get(UtilsService.API_POSITION).subscribe( response => {
        context.positions = response;
        console.log("---------------",response);
        },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des positions`);
      });

  }
  saveAttribution(){
    this.line.position=this.position
    const context = this;
    this.UtilsService.post(UtilsService.API_ATTRIBUTION,this.line).subscribe( response => {
      this.initiateLine();
   this.getAllPositions();
        console.log(response);
        },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du sauvgarde`);
      });
  }
  initiateLine() {
    this.line = {
      attributionId: null,
      attributionLabel: null,
      attributionCode: null,
      position:null
    };
  }
  addLine(position:any) {
   
    this.position=position;
    
    this.saveAttribution();
  }
  deleteLine(line) {
    console.log(line.attributtionId);
    
    
      this.UtilsService.delete(UtilsService.API_ATTRIBUTION+"/"+line.attributionId).subscribe(
        (response) => {
            console.log(response);
            this.getAllPositions();
          
        },
        (error) => {
          console.log('error ', error);
         
        });
      
    

  }
  checkLineValid(): boolean {
    return this.line.attributionLabel === "" || this.line.attributionLabel == null 
  }
}
