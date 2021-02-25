import { Component, OnInit } from '@angular/core';
import { Indicator } from '../../../models/Indicator.model';
import { PositionIndicator } from '../../../models/PositionIndicator.model';
import { OrganisationManagementService } from '../../../services/organisation-management.service';
import { PerformanceManagementService } from '../../../services/performance-management.service';

@Component({
  selector: 'ngx-position-indicator-quantitatif',
  templateUrl: './position-indicator-quantitatif.component.html',
  styleUrls: ['./position-indicator-quantitatif.component.scss']
})
export class PositionIndicatorQuantitatifComponent implements OnInit {
positionWithIndicator:any;
loading = false;
positionIndicator = new PositionIndicator();
indicatorsListQuantitatif: Indicator[] = [];
areas=[];
indicatorScalesList = [];


  constructor( private organisationManagementService: OrganisationManagementService, private performanceManagementService:PerformanceManagementService) { }

  ngOnInit(): void {
    this.getPositionsWithIndicatorsQuantitatif();
  }
getPositionsWithIndicatorsQuantitatif()
{
  this.organisationManagementService.get(OrganisationManagementService.API_POSITION+"get-all-position-with-quantitatif-indicator").subscribe((data:any)=>{
    this.positionWithIndicator=data;
  },(error)=>{
    this.organisationManagementService.showToast('danger',
    'Erreur interne',
    `Un erreur interne a été produit lors du chargement des positions avec leurs indicateurs quantitatifs`);

  })
}


checkLineValidIndicQualitatif(): boolean {
  return  this.positionIndicator.indicator == null || this.positionIndicator.targetLevel == null || this.positionIndicator.targetLevel=="";
}

filterIndicateurQuantitif($event)
  {
    this.getAllIndicatorAreas();
  }

  getAllIndicatorAreas() {
    const context = this;
    this.organisationManagementService.get(this.performanceManagementService.API_INDICATOR_AREA).subscribe( response => {
        context.areas = response;
        console.log(context.areas);
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
    let areaQuant=[];
    this.areas.forEach(area =>{
      let arQuant:any={
        "indicatorAreaCode":area.indicatorAreaCode,
        "createdAt":area.createdAt,
        "createdBy":area.indiccreatedBy,
        "indicatorAreaDetails":area.indicatorAreaDetails,
        "indicatorAreaId":area.indicatorAreaId,
        "indicatorAreaLabel":area.indicatorAreaLabel,
        "performanceIndicators":[],
      };
     
      area.performanceIndicators.forEach(indicator => {
        if (indicator.indicatorType === 'QUANTITATIF') {
          arQuant.performanceIndicators.push(indicator);
      }
      });
    if(  arQuant.performanceIndicators.length>0){
      areaQuant.push(arQuant);
   }
  })
  this.indicatorsListQuantitatif=areaQuant;
  }

  onSelectIndicateurQuantitatif(event){
    this.indicatorScalesList=event.indicatorScales;
  }

  compareIndicatorScales(a, b) {
    return a && b && a.indicatorScaleLabel == b.indicatorScaleLabel;
  }

  checkLineValidIndicQuantitatif(position): boolean {
    return  this.positionIndicator.indicator == null || this.positionIndicator.targetValue == null ||
    this.positionIndicator.targetValue < this.positionIndicator.minValue||this.positionIndicator.targetValue > this.positionIndicator.maxValue||
    this.positionIndicator.maxValue < this.positionIndicator.minValue ||
    position.positionIndicatorList.some(positionIndicator =>
      positionIndicator.indicator.indicatorId == this.positionIndicator.indicator.indicatorId );
  }

  changeValue(position){
    this.checkLineValidIndicQuantitatif(position);
  }

  addPositionIndicator(position){
    this.positionIndicator.positionId=position.positionId;
    this.performanceManagementService.post(this.performanceManagementService.API_POSITION_INDICATOR,this.positionIndicator).subscribe(
      response => {
        this.performanceManagementService.showToast('success',
          'Indicateurs ajoutée avec succés',
          `L'indicateur  ${this.positionIndicator.indicator.indicatorName} a été ajouté au position avec succcés`);
       this.getPositionsWithIndicatorsQuantitatif();
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
          `Un erreur interne a été produit lors de la suppression d'un indicateur ${positionIndicator.indicator.indicatorName} de position`
        );
      }
    );
  }

  editPositionIndicator(positionIndicator){
    if(this.checkEdit(positionIndicator)){
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
    }else{
      this.performanceManagementService.showToast('danger',
      'Erreur valeur non valide',
      `La valeur cible doit être entre la valeur minimal et la valeur maximal`);
    }    
  }

  checkEdit(positionIndicator){
    return positionIndicator.targetValue > positionIndicator.minValue
     && positionIndicator.targetValue < positionIndicator.maxValue 
  }
  
}
