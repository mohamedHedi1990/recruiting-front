import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Attribution } from '../../../models/attribution.model';
import { BusinessUnit } from '../../../models/BusinessUnit.model';
import { Company } from '../../../models/Company.model';
import { EvaluationCriteria } from '../../../models/EvaluationCriteria.model';
import { Indicator } from '../../../models/Indicator.model';
import { Mission } from '../../../models/Mission.model';
import { Position } from '../../../models/Position.model';
import { PositionEvaluationCriteria } from '../../../models/PositionEvaluationCriteria.model';
import { PositionIndicator } from '../../../models/PositionIndicator.model';
import { PositionSubSkill } from '../../../models/PositionSubSkill.model';
import { SkillLevel } from '../../../models/SkillLevel.model';
import { SubSkill } from '../../../models/SubSkill.model';
import { OrganisationManagementService } from '../../../services/organisation-management.service';
import { PerformanceManagementService } from '../../../services/performance-management.service';
import { SkillsManagementService } from '../../../services/skills-management.service';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'ngx-add-new-position',
  templateUrl: './add-new-position.component.html',
  styleUrls: ['./add-new-position.component.scss'],
})
export class AddNewPositionComponent implements OnInit  {
  @Input() position = new Position();
  @Input()  positions_list: Position[];
  @Output() addNewPositionEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  businessUnitsList: BusinessUnit[];
  skillsList = [];
  indicatorsList: Indicator[] = [];
  positionIndicatorListQuantitatif = [];
  positionIndicatorListQualitatif = [];
  indicatorsListQuantitatif: Indicator[] = [];
  indicatorsListQualitatif: Indicator[] = [];
  line = new PositionSubSkill();
  line_indic = new PositionIndicator();
  line_cre = new EvaluationCriteria();
  line_miss = new Mission();
  indicatorScalesList = [];
  skillLevelList = [];
  categories = [];
  indicateur = new PositionIndicator();
  criteriaList: any;
  loading;
  missionsList: Mission[];
  attributionList: Attribution[];
  companies : Company[];
  areas=[];

  constructor(private organisationManagementService: OrganisationManagementService ,
    private performanceManagementService: PerformanceManagementService,
    private skillsManagementService: SkillsManagementService,
    private router: Router, private utilsService: UtilsService,
    private _formBuilder: FormBuilder) { }


  ngOnInit(): void {
    /*if(this.position.positionIndicatorList){
    this.position.positionIndicatorList.forEach(positionIndicator =>{
      if(positionIndicator.indicator.indicatorType ==='QUALITATIF'){
        this.positionIndicatorListQualitatif.push(positionIndicator);
      }
      if(positionIndicator.indicator.indicatorType ==='QUANTITATIF'){
        this.positionIndicatorListQuantitatif.push(positionIndicator);
      }


    })

  }*/
    /*this.getAllIndicatorAreas();
    this.getAllSkills();
    this.getAllIndicators();
     this.initiateLine();
    */

   ;
   if(this.position.positionId == null) {
    this.getAllCriteria();
   }
    this.getAllCompanies();
    //this.getAllUnits();
    this.getAllCategories();
    
   
    this.getAllMissions();
    this.getAllAttributions();
    
  
  }
  getAllCompanies() {
    this.organisationManagementService.get(OrganisationManagementService.API_COMPANY).subscribe(response => {
      this.companies = response;
    })
  }
  getAllUnitsByCompany() {
    this.businessUnitsList = [];
  }
  getAllAttributions() {
    this.attributionList = [];

  }
  changeTargetValue()
  {
     console.log("------valeur cible------");
     console.log(this.checkLineValidIndicQuantitatif())
  }
  changeMinValue()
  {
    console.log("------valeur min------");
    console.log(this.checkLineValidIndicQuantitatif());
  }
  changeMaxValue()
  {
    console.log("------valeur max------");
    console.log(this.checkLineValidIndicQuantitatif())

  }
  filterIndicateurQualitatif($event)
  {
    this.getAllIndicatorAreas();
  }
  filterIndicateurQuantitif($event)
  {
    this.getAllIndicatorAreas();
  }
  onSelectIndicateurQualitatif(event)
  {
    console.log(event);
    this.indicatorScalesList=event.indicatorScales;
  }
  onSelectIndicateurQuantitatif(event)
  {
    console.log(event);
  }
  filterSubSkills(event) {
  
    this.getAllSkills();
    
  }
  filterMissions(event)
  {
    this.getAllMissions();
  }
  filterAttributions(event) {
this.attributionList = [];
  }
  changeSubSkill(subSkill: SubSkill) {

    this.skillLevelList = subSkill.skillLevels;
  }
  changeIndicator(indicator: Indicator) {
    this.indicatorScalesList = indicator.indicatorScales;

  }
  getAllUnits() {
    const context = this;
    this.organisationManagementService.get(OrganisationManagementService.API_BUSINESS_UNIT).subscribe( response => {
        context.businessUnitsList = response;

    },
    error => {
      console.log(error);
      context.organisationManagementService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors du chargement des unites organisationnelles`);

    });

  }
  getAllSkills() {
    const context = this;
    this.skillsManagementService.getAll(SkillsManagementService.API_SKILL).subscribe( response => {
        context.skillsList = response;
        console.log("--------skill lists---------");
        console.log(this.skillsList);
    },
    error => {
      console.log(error);
      context.organisationManagementService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors du chargement des compétences`);

    });

  }
  getAllIndicators() {
    const context = this;
    this.performanceManagementService.getAll(this.performanceManagementService.API_PERFORMANCE_INDICATOR).subscribe( response => {
        context.indicatorsList = response;
        context.indicatorsList.forEach(indicator => {
           console.log(indicator.indicatorType);

          if (indicator.indicatorType === 'QUALITATIF') {
              this.indicatorsListQualitatif.push(indicator);
          }
          if (indicator.indicatorType === 'QUANTITATIF') {
            this.indicatorsListQuantitatif.push(indicator);
          }

        });

     console.log("------list indicateur qualitatif--------------");
     console.log(this.indicatorsListQualitatif);
     console.log("--------list quantitatif--------------");
     console.log(this.indicatorsListQuantitatif);
    },
    error => {
      console.log(error);
      context.organisationManagementService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors du chargement des compétences`);

    });

  }
  getAllCategories() {
    const context = this;
    this.organisationManagementService.get(OrganisationManagementService.API_POSITION_CATEGORY).subscribe( response => {
        context.categories = response;

    },
    error => {
      console.log(error);
      context.organisationManagementService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors du chargement des catégories des positions`);

    });

  }

  getAllIndicatorAreas() {
    const context = this;
    this.organisationManagementService.get(this.performanceManagementService.API_INDICATOR_AREA).subscribe( response => {
        context.areas = response;
       console.log('areaaaa')
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
    let areaQualt=[];
    this.areas.forEach(area =>{
      let arQualt:any={
        "indicatorAreaCode":area.indicatorAreaCode,
        "createdAt":area.createdAt,
        "createdBy":area.indiccreatedBy,
        "indicatorAreaDetails":area.indicatorAreaDetails,
        "indicatorAreaId":area.indicatorAreaId,
        "indicatorAreaLabel":area.indicatorAreaLabel,
        "performanceIndicators":[],
      };
      let arQuant:any={
        "indicatorAreaCode":area.indicatorAreaCode,
        "createdAt":area.createdAt,
        "createdBy":area.indiccreatedBy,
        "indicatorAreaDetails":area.indicatorAreaDetails,
        "indicatorAreaId":area.indicatorAreaId,
        "indicatorAreaLabel":area.indicatorAreaLabel,
        "performanceIndicators":[],
      };;

      area.performanceIndicators.forEach(indicator => {
        if (indicator.indicatorType === 'QUALITATIF') {
          arQualt.performanceIndicators.push(indicator);
      }
      else if (indicator.indicatorType === 'QUANTITATIF') {
        arQuant.performanceIndicators.push(indicator);
      }
      });
    if(  arQuant.performanceIndicators.length>0){
       areaQuant.push(arQuant);
    }
    if(  arQualt.performanceIndicators.length>0){
      areaQualt.push(arQualt);
   }
  })
  console.log('indicators')
  console.log(areaQuant);
  console.log(areaQualt);
  this.indicatorsListQuantitatif=areaQuant;
  this.indicatorsListQualitatif=areaQualt;
  }
  getAllCriteria() {
    const context = this;
    this.utilsService.get(UtilsService.API_EVALUATIONCRITERIA).subscribe(
      (response: any) => {
        context.criteriaList = response;
        context.criteriaList.forEach(criteria => {
          context.position.evaluationCriteriaList.push(new PositionEvaluationCriteria(criteria, 0));
        });
      
      },
      (error) => {
        this.utilsService.showToast(
          'danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement de la liste des critère d'evaluation`,
        );
      },
    );
  }

  getAllMissions() {
    const context = this;
    this.organisationManagementService.get(OrganisationManagementService.API_MISSION).subscribe(
      (response: any) => {
        context.missionsList = response;
        console.log("----------Missions----------");
        console.log(this.missionsList);

      },
      (error) => {
        this.utilsService.showToast(
          'danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement de la liste des missions`,
        );
      },
    );
  }

  onSelectSkills(event)
  {
    console.log("-------select sous competance--------------");
    console.log(event);
    this.skillLevelList=event.skillLevels;
  }
  comparePosition(a, b) {
    return a && b && a.positionLabel == b.positionLabel;
  }
  compareBusinessUnit(a, b) {
    return a && b && a.businessUnitLabel == b.businessUnitLabel;

  }

  initiateLine() {
    this.line = new PositionSubSkill();
    this.line_indic = new PositionIndicator();
    this.line_cre = new EvaluationCriteria();
    this.line_miss = new Mission();
  }
  addLine() {
    //this.position.positionSubSkillList.push(this.line);

    this.initiateLine();
  }
  deleteLine(line) {

   /* if (this.position.positionSubSkillList.includes(line)) {
      const index = this.position.positionSubSkillList.indexOf(line);
      this.position.positionSubSkillList.splice(index, 1);

    }*/
  }
  checkLineValid(): boolean {
    return  this.line.subSkill == null || this.line.requiredLevel == null;
  }



  /*addLineIndic() {
    this.position.positionIndicatorList.push(this.line_indic);



     if (this.line_indic.indicator.indicatorType === 'QUALITATIF') {
      this.positionIndicatorListQualitatif.push(this.line_indic);
     }
     if (this.line_indic.indicator.indicatorType === 'QUANTITATIF') {
       this.positionIndicatorListQuantitatif.push(this.line_indic);
     }



    this.initiateLine();
  }*/
  /*deleteLineIndic(line_indic) {

    if (this.position.positionIndicatorList.includes(line_indic)) {
      const index = this.position.positionIndicatorList.indexOf(line_indic);
      this.position.positionIndicatorList.splice(index, 1);

    }
    if (this.positionIndicatorListQualitatif.includes(line_indic)) {
      const index = this.positionIndicatorListQualitatif.indexOf(line_indic);
      this.positionIndicatorListQualitatif.splice(index, 1);
     }
     if (this.positionIndicatorListQuantitatif.includes(line_indic)) {
      const index = this.positionIndicatorListQuantitatif.indexOf(line_indic);
      this.positionIndicatorListQuantitatif.splice(index, 1);
     }
  }*/


  checkLineValidIndicQualitatif(): boolean {
    return  this.line_indic.indicator == null || this.line_indic.targetLevel == null || this.line_indic.targetLevel=="";
  }
  checkLineValidIndicQuantitatif(): boolean {
    return  this.line_indic.indicator == null || this.line_indic.targetValue == null ||
    this.line_indic.targetValue < this.line_indic.minValue||this.line_indic.targetValue > this.line_indic.maxValue||
    this.line_indic.maxValue < this.line_indic.minValue;
  }

  /*addLineCre() {
    //this.position.evaluationCriteriaList.push(this.line_cre);
    this.initiateLine();
  }*/
  deleteLineCre(line) {

    if (this.position.evaluationCriteriaList.includes(line)) {
      const index = this.position.evaluationCriteriaList.indexOf(line);
      this.position.evaluationCriteriaList.splice(index, 1);

    }
  }
  checkLineValidCre(): boolean {
    return  this.line_cre == null || this.line_cre.evaluationCriteriaLabel == '' || this.line_cre.ponderation == null;
  }

  addLineMiss() {
    this.position.missions.push(this.line_miss);
    this.initiateLine();
  }
  deleteLineMiss(line) {

    if (this.position.missions.includes(line)) {
      const index = this.position.missions.indexOf(line);
      this.position.missions.splice(index, 1);

    }
  }
  checkLineValidMiss(): boolean {
    return  this.line_miss == null || this.line_miss.missionLabel == '' ;
  }
  compareMission(a, b) {
    return a && b && a.missionLabel == b.missionLabel;

  }






  compareSubSkill(a, b ) {
    return a && b && a.subSkillLabel == b.subSkillLabel;

  }

  compareSkillLevel(a, b) {
    return a && b && a.skillLevelLabel == b.skillLevelLabel;
  }
  compareCategory(a, b) {
    return a && b && a.positionCategoryLabel == b.positionCategoryLabel;

  }
  compareIndicator(a, b) {
    return a && b && a.indicatorName == b.indicatorName;
  }
  compareIndicatorScales(a, b) {
    return a && b && a.indicatorScaleLabel == b.indicatorScaleLabel;
  }
  compareCriteria(a, b) {
    return a && b && a.evaluationCriteriaLabel == b.evaluationCriteriaLabel;

  }
  cancel() {
    this.cancelEvent.emit();
  }
  savePosition() {
    /*console.log("---------position----------");
    console.log(this.position);
    this.position.evaluationCriteriaList=this.criteriaList;*/
    this.addNewPositionEvent.emit(this.position);
  }
}


