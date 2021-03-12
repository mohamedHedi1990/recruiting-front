import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
export class AddNewPositionComponent implements OnInit, OnChanges  {
  @Input() position = new Position();
  @Input()  positions_list: Position[];
  @Output() addNewPositionEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  businessUnitsList: BusinessUnit[];
  jobs=[];
  skillsList = [];
  indicatorsList: Indicator[] = [];
  positionIndicatorListQuantitatif = [];
  positionIndicatorListQualitatif = [];
  indicatorsListQuantitatif: Indicator[] = [];
  indicatorsListQualitatif: Indicator[] = [];
  //line = new PositionSubSkill();
  //line_indic = new PositionIndicator();
  //line_cre = new EvaluationCriteria();
  //line_miss = new Mission();
  //line_attr = new Attribution();
  /* line_role = {
    "roleId":null,
    "hierarchicalManagerPosition":null,
    "roleLabel":""
  }

  indicatorScalesList = [];
  skillLevelList = [];
  categories = [];
  indicateur = new PositionIndicator();
  criteriaList: any;
  loading;
  missionsList: Mission[];
  attributionList: Attribution[];
  roleList:[]
 */
  companies : Company[];
  areas=[];
  //linearMode = false;

  constructor(private organisationManagementService: OrganisationManagementService ,
    private performanceManagementService: PerformanceManagementService,
    private skillsManagementService: SkillsManagementService,
    private router: Router, private utilsService: UtilsService,
    private _formBuilder: FormBuilder) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.position.company != null) {
      this.getAllUnitsByCompany();
    }
      //this.getAllCompanies();
      //this.getAllJobs();

      //if (this.position.positionId == null && this.position.evaluationCriteriaList.length == 0) {
      //  this.getAllCriteria();
     // }
    }


  ngOnInit(): void {
    //this.linearMode = false;
   //if(this.position.positionId == null) {
   // this.getAllCriteria();
   //}

    this.getAllCompanies();
    this.getAllJobs();
    
    //this.getAllCategories();

    //this.getAllMissions();
    //this.getAllAttributions();
    //this.getAllRoles();

  }

  getAllJobs(){
    this.organisationManagementService.get(OrganisationManagementService.API_JOB).subscribe(response => {
      this.jobs = response;
    })
  }

  getAllCompanies() {
    this.organisationManagementService.get(OrganisationManagementService.API_COMPANY).subscribe(response => {
      this.companies = response;
    })
  }
  getAllUnitsByCompany() {
    let id = this.position.company.companyId;
    this.businessUnitsList = [];
    this.organisationManagementService.get(OrganisationManagementService.API_COMPANY+id+'/business-unit-list').subscribe(response => {
      this.businessUnitsList = response;

    })

  }
  getAllPositionsByCompany() {
    let id = this.position.company.companyId;
    this.positions_list = [];
    this.organisationManagementService.get(OrganisationManagementService.API_COMPANY+id+'/positions-list').subscribe(response => {
      this.positions_list = response;



    })


  }
  getUnitByHirarchicalManager(hierarchicalManagerPosition : Position){
    if(hierarchicalManagerPosition == null){
      this.getAllUnitsByCompany();
    }else{
      this.position.businessUnit = hierarchicalManagerPosition.businessUnit;
    }
  }
  /*getAllAttributions() {
    //this.attributionList = [];
    this.organisationManagementService.get(OrganisationManagementService.API_ATTRIBUTION).subscribe(response => {
      this.attributionList = response;
    })

  }
  getAllRoles(){
    this.organisationManagementService.get(OrganisationManagementService.API_FUNCTIONAL_ROLE).subscribe(response => {
      this.roleList = response;
    })
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
    this.getAllAttributions();
  }
  filterRoles(event){
    this.getAllRoles();
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
        this.criteriaList = response;
        this.criteriaList.forEach(criteria => {
          this.position.evaluationCriteriaList.push(new PositionEvaluationCriteria(criteria, 0));
        });
      console.log(this.position)
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
  {this.skillLevelList=event.skillLevels;}
 */
  comparePositionH(a, b) {
    if (!a && !b) return true;
    return a && b && a.positionId == b.positionId;
  }
  comparePositionF(a, b) {
    return a && b && a.positionId == b.positionId;
  }



  compareJob(a, b) {
    return a && b && a.jobLabel == b.jobLabel;
  }

  compareBusinessUnit(a, b) {
    return a && b && a.businessUnitLabel == b.businessUnitLabel;

  }

  initiateLine() {
    //this.line = new PositionSubSkill();
    //this.line_indic = new PositionIndicator();
    //this.line_cre = new EvaluationCriteria();
    //this.line_miss = new Mission();
    //this.line_attr = new Attribution();
    //this.line_role ={
     // "roleId":null,
     // "hierarchicalManagerPosition":null,
     // "roleLabel":""
    //};
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
  //checkLineValid(): boolean {
 //   return  this.line.subSkill == null || this.line.requiredLevel == null;
 // }


/*
  checkLineValidIndicQualitatif(): boolean {
    return  this.line_indic.indicator == null || this.line_indic.targetLevel == null || this.line_indic.targetLevel=="";
  }
  checkLineValidIndicQuantitatif(): boolean {
    return  this.line_indic.indicator == null || this.line_indic.targetValue == null ||
    this.line_indic.targetValue < this.line_indic.minValue||this.line_indic.targetValue > this.line_indic.maxValue||
    this.line_indic.maxValue < this.line_indic.minValue;
  }
*/
/*
  deleteLineCre(line) {

    if (this.position.evaluationCriteriaList.includes(line)) {
      const index = this.position.evaluationCriteriaList.indexOf(line);
      this.position.evaluationCriteriaList.splice(index, 1);

    }
  }
  checkLineValidCre(): boolean {
    return  this.line_cre == null || this.line_cre.evaluationCriteriaLabel == '' || this.line_cre.ponderation == null;
  }

  editAttribute(attribution){
    if(this.line_attr.attributionLabel != ""){
      attribution.attributionLabel=this.line_attr.attributionLabel
    }
    this.initiateLine();
  }
  checkRole(){
    if(this.line_role.roleLabel == undefined){
      let roleLabel=this.line_role;
      this.initiateLine();
      // @ts-ignore
      this.line_role.roleLabel=roleLabel;
    }
  }

  editRole(role){
    if( this.line_role.roleLabel != "" && this.line_role.roleLabel != undefined){
        role.roleLabel=this.line_role.roleLabel;
      }else if(this.line_role.roleLabel == undefined ){
        role.roleLabel=this.line_role;
      }
    this.initiateLine();
  }

  editMission(mission){
    if(this.line_miss.missionLabel == undefined || this.line_miss.missionLabel != ""){
    if(this.line_miss.missionId == undefined ){
      mission.missionLabel=this.line_miss;
    }else{
      mission.missionLabel=this.line_miss.missionLabel;
    }
    }
    this.initiateLine();
  }

  addLineMiss() {
    if(this.line_miss.missionId == undefined){
      let mission= new Mission();
      // @ts-ignore
      mission.missionLabel=this.line_miss;
      this.line_miss=mission
    }else{
      this.line_miss.missionId=null;
    }
    this.position.missions.push(this.line_miss);
    this.initiateLine();
  }
  deleteLineMiss(mission,index) {
    if(mission.missionId != undefined) {
      this.organisationManagementService.delete(OrganisationManagementService.API_MISSION + mission.missionId).subscribe(response => {
          this.position.missions.splice(index, 1);
        },
        error => {
          this.organisationManagementService.showToast('danger',
            'Erreur interne',
            `Un erreur interne a été produit lors du supression de mission`);

        });
    }
    else{
        this.position.missions.splice(index, 1);
      }
  }
  checkLineValidMiss(): boolean {
    return  this.line_miss == null || this.line_miss.missionLabel == '' ;
  }
  compareMission(a, b) {
    return a && b && a.missionLabel == b.missionLabel;

  }


  addLineAttr() {
      if(this.line_attr.attributionId == undefined){
      let attribut= new Attribution();
      // @ts-ignore
      attribut.attributionLabel=this.line_attr;
      this.line_attr=attribut
    }else{
      this.line_attr.attributionId=null;
    }
    this.position.attributions.push(this.line_attr);
    this.initiateLine();
  }
  deleteAttribution(attribution,index) {
    if(attribution.attributionId != undefined) {
      this.organisationManagementService.delete(OrganisationManagementService.API_ATTRIBUTION + attribution.attributionId).subscribe(response => {
          this.position.attributions.splice(index, 1);
        },
        error => {
          this.organisationManagementService.showToast('danger',
            'Erreur interne',
            `Un erreur interne a été produit lors du supression d'attribution`);

        });
    }else{
      this.position.attributions.splice(index, 1);
    }
  }
  checkLineValidAttr(): boolean {
    return  this.line_attr == null || this.line_attr.attributionLabel == '' ;
  }
  compareAttribution(a, b) {
    return a && b && a.attributionLabel == b.attributionLabel;

  }



  addLineRole() {
    if(this.line_role.roleId == undefined){
     // let role = {
     //   "roleId":null,
     //   "hierarchicalManagerPosition":this.line_role,
     //   "roleLabel":this.line_role
     // }
     // this.line_role=role;
    }else{
      this.line_role.roleId=null;
    }
    this.position.functionalRoles.push(this.line_role);
    this.initiateLine();
  }
  deleteRole(role,index) {
    if(role.roleId != undefined) {
      this.organisationManagementService.delete(OrganisationManagementService.API_FUNCTIONAL_ROLE + role.roleId).subscribe(response => {
          this.position.functionalRoles.splice(index, 1);
        },
        error => {
          this.organisationManagementService.showToast('danger',
            'Erreur interne',
            `Un erreur interne a été produit lors du supression de role fonctionnel`);

        });
    }else{
      this.position.functionalRoles.splice(index, 1);
    }
  }
  checkLineValidRole(): boolean {
    return  this.line_role == null || this.line_role.roleLabel == '' ;
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

 */
  compareCompany(a,b){
    return a && b && a.companyLabel == b.companyLabel;
  }
  cancel() {
    this.position = new Position();
    this.cancelEvent.emit();
  }
  savePosition() {
    this.addNewPositionEvent.emit(this.position);
  }
  checkGeneralInforValid():Boolean{
    return  this.position.positionLabel == null || this.position.positionLabel == '' ||
    //this.position.positionCategory ==null
      this.position.businessUnit ==null ||
    this.position.company == null || this.position.job == null
      
      || this.position.startDate == null || this.position.endDate == null ||
      this.position.startDate > this.position.endDate;
  }
}
