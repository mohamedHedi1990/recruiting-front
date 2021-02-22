import { SkillsGroupComponent } from './../skills-group/skills-group.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UtilsService } from "./../../../services/utils.service";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop'
import { SkillsManagementService } from '../../../services/skills-management.service';
@Component({
  selector: 'ngx-skills-management',
  templateUrl: './skills-management.component.html',
  styleUrls: ['./skills-management.component.scss']
})
export class SkillsManagementComponent implements OnInit {

  skillList = [];
  rowskill = null;
  displayAddNewSkillModal = false;
  showAddSubskillModal = false;

  displayDeleteSkillModal = false;
  selectedskills = [];
  subSkills = []
  subSkill = {
    subSkillId: null,
    subSkillLabel: null,
    subSkillCode: null,
    subSkillDetails: null,
    skill:null,
    createdAt: null,
    updatedAt: null,
    skillLevels: []
  };
  skillLevel={
    skillLevelId:null,
    skillLevelLabel:null,
    skillLevelCode:null,
    skillLevelDetails:null,
    orderValue:null
  };
  skillLevels=[];
  loading = false;
  titleHeadersubSkill: any;
  skillsGroupList: any;
  line = {
    skillLevel: null,

  };

  form:any=null;
  selectedFile:any=null;
  showImportButton=false;


  skill = {
    skillId: null,
    skillLabel: null,
    skillCode: null,
    skillDetails: null,
    skillsGroup:null,
    createdAt: null,
    updatedAt: null,
    subSkills: []
  };

  modif=false;

  constructor(private UtilsService: UtilsService, private skillsManagementService : SkillsManagementService,private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.initSkill();
    this.getAllskills();
    this.getAllSkillsGroups();
  }

  selectFile(event,form){
    this.selectedFile=event.files[0];
    this.form=form;
    this.showImportButton=true;
  }

  clickOnImportFileButton() {
    
  }

  clear(event){
    this.form.clear();
    this.showImportButton=false;
  }

  importer(){
    const context = this;
    let formData = new FormData()
    formData.append('file', this.selectedFile)
    this.UtilsService.post(SkillsManagementService.API_SKILLS_GROUP+"/import",formData).subscribe(
      (response) => {
        this.UtilsService.showToast('success',
          "Document importé avec succés",
          `La liste des compétences ont été importés avec succcés`);
      context.getAllskills();
    }, (error) => {
      this.UtilsService.showToast('danger',
      error.MESSAGE,
      ``);
    })
  }


  initSkill() {
    this.skill = {
      skillId: null,
      skillLabel: null,
      skillCode: null,
      skillDetails: null,
      skillsGroup: null,
      createdAt: null,
      updatedAt: null,
      subSkills: []
    };
  }
  initskillLevel(level,ordre){
    this.skillLevel.skillLevelLabel=level;
    this.skillLevel.orderValue=ordre;
  }

  getAllskills() {
    const context = this;
    this.skillsManagementService.getAll(SkillsManagementService.API_SKILL).subscribe(response => {
      context.skillList = response;

    },
      error => {
        this.skillsManagementService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des compétences`);
      });
  }

  delSkill() {

    this.skillsManagementService.delete(SkillsManagementService.API_SKILL+this.skill.skillId).subscribe(
      (response) => {
        if (response.MESSAGE === 'DELETED') {
          this.skillsManagementService.showToast(
            "success",
            "Compétence supprimée avec succés",
            `La compétence  ${this.skill.skillLabel} a été supprimée avec succcés`
          );
        } else if (response.MESSAGE === 'NOT_EMPTY') {
          this.skillsManagementService.showToast(
            "danger",
            "Compétences non vide",
            `Des sous compétences reliées à la compétences  ${this.skill.skillLabel} ont été trouvés. Merci de les supprimer ou de l'associer à des autres compétences avant de supprimer cette  compétence.`
          );
        }

        this.displayDeleteSkillModal = false;
        this.initSkill();
        this.getAllskills();
      },
      (error) => {
        console.log('error ', error);
        this.skillsManagementService.showToast(
          "danger",
          "Erreur interne",
          `Un erreur interne a été produit lors de la suppression de compétences  ${this.skill.skillLabel}`
        );
        this.displayDeleteSkillModal = false;
        this.initSkill();
        this.getAllskills();
      }
    );
  }
  deleteSkill(rowdata) {
    this.skill = rowdata;
    this.displayDeleteSkillModal = true;
  }
  addNewSkill() {
    this.initSkill();
    this.displayAddNewSkillModal = true;
    this.titleHeadersubSkill = "Ajouter des sous compétences pour cette compétence";
  }
  hideAddNewSkillModal() {
    this.displayAddNewSkillModal = false;
    this.initSkill();
    this.getAllskills();
  }
  ImportNewSkill() {

  }

  saveNewSkill(skill) {

    const context = this;
    this.skill = skill;

      delete this.skill.createdAt;
      delete this.skill.updatedAt;
      delete this.skill.skillsGroup.createdAt;
      delete this.skill.skillsGroup.updatedAt;
      delete this.skill.skillsGroup.skillList;
      this.skill.subSkills.forEach(item =>{
        delete item.createdAt;
        delete item.updatedAt;
        if(item.skillLevels){
          item.skillLevels.forEach(element => {
            delete element.createdAt;
            delete element.updatedAt;
          });
        }
      })
      this.skillsManagementService.post(SkillsManagementService.API_SKILL, this.skill).subscribe(
        (response) => {

          if (this.skill.skillId == null) {
            this.skillsManagementService.showToast('success',
              'Compétence enregistrée avec succés',
              `La compétence   ${this.skill.skillLabel} a été enregistrée avec succcés`);
          }
          else {
            this.skillsManagementService.showToast('success',
              'Compétence modifiée avec succés',
              `La compétence ${this.skill.skillLabel} a été modifiée avec succcés`);
          }
          context.displayAddNewSkillModal = false;
          context.initSkill();
          context.getAllskills();
        },
        (error) => { console.log(error); }
      );
  }
  setdefaulskillLevel() {
    if(this.subSkill.skillLevels.length<=0){
        this.initskillLevel("DEBUTANT",1);
        this.subSkill.skillLevels.push(this.skillLevel);
        this.initiateskilLevel();
        this.initskillLevel("INTERMEDIAIRE",2);
        this.subSkill.skillLevels.push(this.skillLevel);
        this.initiateskilLevel();
        this.initskillLevel("AVANCE",3);
        this.subSkill.skillLevels.push(this.skillLevel);
        this.initiateskilLevel();
        this.initskillLevel("EXPERT",4);
        this.subSkill.skillLevels.push(this.skillLevel);
        this.initiateskilLevel();
    }
  }

  editSkill(rowskill) {
    this.skill = rowskill;
    this.displayAddNewSkillModal = true;
    this.titleHeadersubSkill = `Modifier la liste des sous compétences`;
  }
  getAllSkillsGroups() {
    const context = this;
    this.skillsManagementService.getAll(SkillsManagementService.API_SKILLS_GROUP).subscribe(
      (response) => {
        context.skillsGroupList = response;
      },
      (error) => {
        this.skillsManagementService.showToast(
          "danger", "Erreur interne",
          `Un erreur interne a été produit lors du chargement des famille des compétences`
        );
      }
    );
  }
  addsubskill(skill){
    this.skill=skill;
    this.initSubSkill();
    this.setdefaulskillLevel();
    this.titleHeadersubSkill="Ajouter une sous compétence";
    this.modif = false;
    this.showAddSubskillModal=true;

  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.subSkill.skillLevels, event.previousIndex, event.currentIndex);
    let i =1
    this.subSkill.skillLevels.forEach(skillLevel =>{
        skillLevel. orderValue = i;
        i++;
    })
  }

  addskillLevel() {
   
    let index = this.subSkill.skillLevels.length;
    this.skillLevel.orderValue = index;
    this.subSkill.skillLevels.push(this.skillLevel);
    this.initSkillLevel();

  }

  deletesubSkill(subSkill) {

    this.skillsManagementService.delete(SkillsManagementService.API_SUB_SKILL+subSkill.subSkillId).subscribe(
      (response) => {
        if (response.MESSAGE === 'DELETED') {
          this.skillsManagementService.showToast(
            "success","Compétence supprimée avec succés",
            `La sous compétence  ${subSkill.subSkillLabel} a été supprimée avec succcés`
          );
        }
        this.getAllskills();
      },
      (error) => {
        console.log('error ', error);
        this.skillsManagementService.showToast(
          "danger","Erreur interne",
          `Un erreur interne a été produit lors de la suppression de sous compétence  ${subSkill.subSkillLabel}`
        );});
  }
  checkskillLevelValid(): boolean {
    return (
      this.skillLevel.skillLevelLabel === "" || this.skillLevel.skillLevelLabel == null
    );
  }
  deleteskillLevel(line){
    for (let i = 0; i <  this.subSkill.skillLevels.length; i++) {
      const element =  this.subSkill.skillLevels[i];
      if (element != null && element === line) {
        this.subSkill.skillLevels.splice(i, 1);
        break;
      }
    }
  }
  saveNewSubskill(subSkill , open :boolean){
    let skill_id = this.skill.skillId
    
    this.subSkill=subSkill;
    this.subSkill.skill = this.skill;
    delete this.subSkill.createdAt;
    delete this.subSkill.updatedAt;
    delete this.subSkill.skill;
    if(this.subSkill.skillLevels){
      this.subSkill.skillLevels.forEach(element => {
        delete element.createdAt;
        delete element.updatedAt;
      });
    }



   this.skillsManagementService.put(SkillsManagementService.API_SKILL+skill_id+'/add-sub-skill',this.subSkill).subscribe(

   //this.skillsManagementService.put(SkillsManagementService.API_SUB_SKILL,this.subSkill).subscribe(
      (response) => {

        this.showAddSubskillModal = open ;
        this.getAllskills();
        if(this.subSkill.subSkillId == null){
          this.skillsManagementService.showToast(
            "success","Sous compétence ajoutée avec succés",
            `La sous compétence  ${this.subSkill.subSkillLabel} a été ajoutée avec succcés`
          );
        }else{
          this.skillsManagementService.showToast(
            "success"," sous compétence modifiée avec succés",
            `La sous compétence  ${this.subSkill.subSkillLabel} a été modifiée avec succcés`
          );

        }

      },
        (error)=>{
         console.log(error);
         this.showAddSubskillModal = open ;
         this.skillsManagementService.showToast(
           "danger","Erreur interne",
           `Un erreur interne a été produit lors de l'ajout de sous compétence  ${this.subSkill.subSkillLabel}`
         );
       }
    );
  }
  validesaveNewSubskill(subSkill , open){
    this.saveNewSubskill(subSkill,open);
    this.initSubSkill();
    this.setdefaulskillLevel();

  }
  editsubSkill(subSkill,skill){
    this.subSkill=subSkill;
    this.subSkill.skill=skill;
    this.sortTable(this.subSkill.skillLevels);
    this.titleHeadersubSkill="Modifier une sous compétence";
    this.modif = true;
    this.showAddSubskillModal=true;


  }
  sortTable(table){
    table.sort(function(a, b) {
      return a.orderValue - b.orderValue;
    });

  }


  initSubSkill(){
    this.subSkill = {
      subSkillId: null,
    subSkillLabel: null,
    subSkillCode: null,
    subSkillDetails: null,
    skill:null,
    createdAt: null,
      updatedAt: null,
    skillLevels: []
    };
  }
  initSkillLevel(){
    this.skillLevel={
      skillLevelId:null,
      skillLevelLabel:null,
      skillLevelCode:null,
      skillLevelDetails:null,
      orderValue:null
    };
  }
  initiateskilLevel(){
    this.skillLevel={
      skillLevelId:null,
      skillLevelLabel:null,
      skillLevelCode:null,
      skillLevelDetails:null,
      orderValue:null
    };
  }
}

