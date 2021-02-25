import { Component, OnInit } from '@angular/core';
import { Indicator } from '../../../models/Indicator.model';
import { PositionIndicator } from '../../../models/PositionIndicator.model';
import { OrganisationManagementService } from '../../../services/organisation-management.service';
import { PerformanceManagementService } from '../../../services/performance-management.service';

@Component({
  selector: 'ngx-position-indicator-qualitatif',
  templateUrl: './position-indicator-qualitatif.component.html',
  styleUrls: ['./position-indicator-qualitatif.component.scss']
})
export class PositionIndicatorQualitatifComponent implements OnInit {

  positionWithIndicator:any;
loading = false;
positionIndicator = new PositionIndicator();
indicatorsListQualitatif: Indicator[] = [];
areas=[];
indicatorScalesList = [];


  constructor( private organisationManagementService: OrganisationManagementService, private performanceManagementService:PerformanceManagementService) { }

  ngOnInit(): void {
    this.getPositionsWithIndicatorsQualitatif();
  }
getPositionsWithIndicatorsQualitatif()
{
  this.organisationManagementService.get(OrganisationManagementService.API_POSITION+"get-all-position-with-qualitatif-indicator").subscribe((data:any)=>{
    this.positionWithIndicator=data;
  },(error)=>{
    this.organisationManagementService.showToast('danger',
    'Erreur interne',
    `Un erreur interne a été produit lors du chargement des positions avec leurs indicateurs qualitatifs`);
  })
}


checkLineValidIndicQualitatif(position): boolean {
  return  this.positionIndicator.indicator == null || this.positionIndicator.targetLevel == null ||
   this.positionIndicator.targetLevel=="" ||
   position.positionIndicatorList.some(positionIndicator =>
     positionIndicator.indicator.indicatorId == this.positionIndicator.indicator.indicatorId );
}

filterIndicateurQualitatif($event)
  {
    this.getAllIndicatorAreas();
  }

  getAllIndicatorAreas() {
    const context = this;
    this.organisationManagementService.get(this.performanceManagementService.API_INDICATOR_AREA).subscribe( response => {
        context.areas = response;
        this.deviser();
    },
    error => {
      console.log(error);
      context.organisationManagementService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors du chargement des domaines d'indicateurs`);

    });

  }
  deviser(){
    let areaQualit=[];
    this.areas.forEach(area =>{
      let arQualit:any={
        "indicatorAreaCode":area.indicatorAreaCode,
        "createdAt":area.createdAt,
        "createdBy":area.indiccreatedBy,
        "indicatorAreaDetails":area.indicatorAreaDetails,
        "indicatorAreaId":area.indicatorAreaId,
        "indicatorAreaLabel":area.indicatorAreaLabel,
        "performanceIndicators":[],
      };
     
      area.performanceIndicators.forEach(indicator => {
        if (indicator.indicatorType === 'QUALITATIF') {
          arQualit.performanceIndicators.push(indicator);
      }
      });
    if(  arQualit.performanceIndicators.length>0){
      areaQualit.push(arQualit);
   }
  })
  this.indicatorsListQualitatif=areaQualit;
  }

  onSelectIndicateurQualitatif(event){
    this.indicatorScalesList=event.indicatorScales;
  }

  compareIndicatorScales(a, b) {
    return a && b && a.indicatorScaleLabel == b.indicatorScaleLabel;
  }

  checkLineValidIndicQuantitatif(): boolean {
    return  this.positionIndicator.indicator == null || this.positionIndicator.targetLevel == null 
  }
 

  addPositionIndicator(position){
    this.positionIndicator.positionId=position.positionId;
    this.performanceManagementService.post(this.performanceManagementService.API_POSITION_INDICATOR,this.positionIndicator).subscribe(
      response => {
        this.performanceManagementService.showToast('success',
          'Indicateur ajoutée avec succés',
          `L'indicateur ${this.positionIndicator.indicator.indicatorName} a été ajouté au position avec succcés`);
       this.getPositionsWithIndicatorsQualitatif();
       this.positionIndicator=new PositionIndicator()
      },
      error => {
        this.performanceManagementService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du l'ajout d'un indicateur au position`);
      });
  }

  deletePositionIndicator(position,positionIndicator,rowIndex){
    this.performanceManagementService.delete(this.performanceManagementService.API_POSITION_INDICATOR+positionIndicator.positionIndicatorId).subscribe(
      (response) => {
        position.positionIndicatorList.splice(rowIndex,1)
      },
      (error) => {
        this.performanceManagementService.showToast(
          "danger",
          "Erreur interne",
          `Un erreur interne a été produit lors de la suppression du indicateur ${positionIndicator.indicator.indicatorName} de position`
        );
      }
    );
  }

  editPositionIndicator(positionIndicator){
    this.performanceManagementService.post(this.performanceManagementService.API_POSITION_INDICATOR,positionIndicator).subscribe(
      response => {
        this.performanceManagementService.showToast('success',
          'Indicateur modifiée avec succé',
          `L'indicateur  ${positionIndicator.indicator.indicatorName} du position a été modifiée avec succcés`);
        this.getAllIndicatorAreas();
      },
      error => {
        this.performanceManagementService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du modification de l'indicateur du position`);
      });
  }

}
