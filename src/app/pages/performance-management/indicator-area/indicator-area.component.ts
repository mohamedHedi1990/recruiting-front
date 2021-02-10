import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PerformanceManagementService } from '../../../services/performance-management.service';

@Component({
  selector: 'ngx-indicator-area',
  templateUrl: './indicator-area.component.html',
  styleUrls: ['./indicator-area.component.scss']
})
export class IndicatorAreaComponent implements OnInit {

  showIndicatorAriaWindow = false;
  areas = [];
  loading = false;
  area = null;
  indicator =null;
  displayDeleteArea = false ;
  displayDeleteIndicatorAria = false;
  Liste_default_scale = [
    {

      indicatorScaleLabel: 'Inférieure à l’objectif',
      indicatorScaleValue: 50
     },
     {

      indicatorScaleLabel: 'Proche de l’objectif',
      indicatorScaleValue: 75
     },
     {

      indicatorScaleLabel: 'Conforme à l’objectif',
      indicatorScaleValue: 100
     },
     {

      indicatorScaleLabel: 'Dépasse l’objectif',
      indicatorScaleValue: 120
     }
   ];
  constructor(private performanceManagementService: PerformanceManagementService,
    public dialogService: DialogService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.initArea();
    this.getAllAreas();
  }
  saveArea(area) {
    console.log('area to save');
    console.log(area);
    if(area.performanceIndicators.length >0){
      area.performanceIndicators.forEach(indicator => {
        if(indicator.indicatorType =="QUALITATIF" && (indicator.indicatorScales == null || indicator.indicatorScales.length === 0))
        {
          indicator.indicatorScales=this.Liste_default_scale;
        }

        //code ajouté pour ne pas avoir un conflit au niveau des dates
          if (indicator.createdAt) {
            delete indicator.createdAt;
            delete indicator.updatedAt;
            delete indicator.indicatorArea.createdAt;
            delete indicator.indicatorArea.updatedAt;
          }
      });
    }
    // if (area.indicatorAreaId == null) {
      const savedArea = this.buildArea(area);
      this.performanceManagementService.post(this.performanceManagementService.API_INDICATOR_AREA, savedArea).subscribe(
        response => {

          this.hideAreaWindow();
          this.getAllAreas();
          if(area.indicatorAreaId == null){
            this.performanceManagementService.showToast('success',
              'Domaine des indicateurs ajoutée avec succés',
              `Le domaine des indicateurs  ${savedArea.indicatorAreaLabel} a été ajoutée avec succcés`);
          }else{

            this.performanceManagementService.showToast('success',
            'Domaine des indicateurs modifié avec succés',
            `Le domaine des indicateurs  ${savedArea.indicatorAreaLabel} a été modifié avec succcés`);

          }

          },
          error => {

            this.performanceManagementService.showToast('danger',
              'Erreur interne',
              `Un erreur interne a été produit lors de l'ajout de domaine des indicateurs  ${savedArea.indicatorAreaLabel}`);
          });
     // }
      /*else {

        this.performanceManagementService.put( this.performanceManagementService.API_INDICATOR_AREA,area).subscribe(
          response => {
            this.hideAreaWindow();
            this.getAllAreas();
            this.performanceManagementService.showToast('success',
              'Domaine des indicateurs modfiée avec succés',
              `Le domaine des indicateurs  ${area.indicatorAreaLabel} a été modifiée avec succcés`);
            },
          error => {
            this.performanceManagementService.showToast('danger',
              'Erreur interne',
              `Un erreur interne a été produit lors de la modification de domaine des indicateurs  ${area.indicatorAreaLabel}`);
          });

    }*/


  }


  getAllAreas() {
    this.performanceManagementService.getAll(this.performanceManagementService.API_INDICATOR_AREA).subscribe(response => {
      this.areas = response;
      this.areas.forEach(area =>{
        area.nbrPerformanceIndicator = area.performanceIndicators.length;
      });
      this.initArea();
    },
      error => {
        this.performanceManagementService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des groupes des indicateurs`);
      });

  }

  editArea(area) {
    this.area = area;
    this.area.performanceIndicators= [];
    console.log('area to edit ')
    console.log(area)
    this.showIndicatorAriaWindow = true;
  }

  delArea() {


    this.performanceManagementService.delete(this.performanceManagementService.API_INDICATOR_AREA+this.area.indicatorAreaId).subscribe(response => {
      console.log('response', response)


        this.getAllAreas();
      this.displayDeleteArea = false;

    },
      error => {
        console.log('error', error)
        if(error.error == "Area deleted"){
          this.performanceManagementService.showToast('success',
          'Domaine des indicateurs supprimée avec succés',
          `Le domaine des indicateurs  ${this.area.indicatorAreaLabel} a été supprimée avec succcés`);


        }else if (error.error  === 'Area not empty') {
          this.performanceManagementService.showToast(
            "danger","Domaine des indicateurs non vide",
            `Des indicateurs reliées au domaine des indicateurs  ${this.area.indicatorAreaCode} ont été trouvés. Merci de les supprimer ou de l'associer à des autres domaines  avant de supprimer ce domaine des indicateurs .`
          ); }
        this.getAllAreas();
      this.displayDeleteArea = false;
      });


  }
  hideAreaWindow() {
    this.showIndicatorAriaWindow = false;
  }
  deleteArea(area) {
    this.area = area;
    this.displayDeleteArea = true;
  }
  initArea() {

    this.area = {
      indicatorAreaId: null,
      indicatorAreaLabel:'',
      indicatorAreaCode: '',
      indicatorAreaDetails: '',
      nbrPerformanceIndicator : 0,
      performanceIndicators: []

    };

  }
  buildArea(area): any {

    return {
      indicatorAreaId: area.indicatorAreaId,
      indicatorAreaLabel:area.indicatorAreaLabel,
      indicatorAreaCode: area.indicatorAreaCode,
      indicatorAreaDetails: area.indicatorAreaDetails,
      performanceIndicators: area.performanceIndicators

    };

  }
  initIndicator() {
    this.indicator= {
      indicatorId: null,
      indicatorName : '',
      indicatorSens : 'CROISSANT',
      indicatorFormula : '',
      indicatorEvaluation : 'COLLECTIF',
      indicatorType : 'QUALITATIF',
      indicatorArea : null,
      indicatorScales : []

    };
  }

}
