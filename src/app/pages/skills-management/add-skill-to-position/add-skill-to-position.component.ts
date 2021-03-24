import { Component, OnInit } from '@angular/core';
import { OrganisationManagementService } from "../../../services/organisation-management.service";
import { SkillsManagementService } from "../../../services/skills-management.service";
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'ngx-add-skill-to-position',
  templateUrl: './add-skill-to-position.component.html',
  styleUrls: ['./add-skill-to-position.component.scss']
})
export class AddSkillToPositionComponent implements OnInit {

  positions_list = []
  positionSubSkill = {
    skill: null,
    level: null,
  }
  skillLevelList = [];
  skillsList = [];
  businessUnitList = [];
  loading = false;
  showBusinessUnitSkillsWindow = false;
  skillsGroupList = [];
  selectedSkills :any[][];
  skillList :any [][];
  businessUnitSKills : any = [];
  displayAddSkillsBusinessUnit=false;
  businessUnitSKill:any;
  constructor(private organisationManagementService: OrganisationManagementService, private skillsManagementService: SkillsManagementService)
   {
    this.skillList=[];
    this.selectedSkills=[];
  }

  ngOnInit(): void {
    this.getAllPositions();
    this.getAllSkills()
    this.getAllBusinessUnit();
    this.getAllSkillsGroup();
    this.getAllBusinessUnitSkills()
  }

  getAllBusinessUnitSkills() {
    this.organisationManagementService.get(OrganisationManagementService.API_BUSINESS_UNIT_SKILL).subscribe(
      (response: any) => {
        this.businessUnitSKills = response;
        console.log(this.businessUnitSKills);

      },
      (error) => {
        this.organisationManagementService.showToast(
          'danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du l'importation des unités fonctionnelle`
        );
      }
    );
  }

  getAllBusinessUnit() {
    this.organisationManagementService.get(OrganisationManagementService.API_BUSINESS_UNIT).subscribe(
      (response: any) => {
        this.businessUnitList = response;
      },
      (error) => {
        this.organisationManagementService.showToast(
          'danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du l'importation des unités fonctionnelle`
        );
      }
    );
  }

  getAllPositions() {
    this.organisationManagementService.get(OrganisationManagementService.API_POSITION + 'get-positions-with-sub-skills').subscribe(
      (response: any) => {
        this.positions_list = response;
      },
      (error) => {
        this.organisationManagementService.showToast(
          'danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du l'importation des positions`
        );
      }
    );
  }

  getAllSkillsGroup() {
    const context = this;
    this.skillsManagementService.getAll(SkillsManagementService.API_SKILLS_GROUP).subscribe(response => {
      context.skillsGroupList = response;
    },
      error => {
        context.organisationManagementService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des familles de compétences`);

      });

  }

  getAllSkills() {
    const context = this;
    this.skillsManagementService.getAll(SkillsManagementService.API_SKILL).subscribe(response => {
      context.skillsList = response;
      console.log('contex ', context.skillsList);
    },
      error => {
        context.organisationManagementService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des compétences`);

      });

  }

  checkValidPositionSubSkill(position) {
    return this.positionSubSkill.skill == null || this.positionSubSkill.level == null ||
      position.positionSubSkills.some(positionSubSkill =>
        positionSubSkill.subSkill.subSkillId == this.positionSubSkill.skill.subSkillId);
  }
  positionContainsSubSkill(position) {
    position.positionSubSkills.forEach(positionSubSkill => {
      if (positionSubSkill.subSkill.subSkillId == this.positionSubSkill.skill.subSkillId) {
        return true;
      }
    })
    return false;
  }

  initPositionSubSkill() {
    this.positionSubSkill = {
      skill: null,
      level: null,
    };
  }
  savePositionSubSkill(position) {
    const positionSubSkill1 = {
      "positionId": position.positionId,
      "subSkill": this.positionSubSkill.skill,
      "requiredLevel": this.positionSubSkill.level,
      "local": true
    };
    this.skillsManagementService.post(SkillsManagementService.API_POSITION_SUB_SKILL, positionSubSkill1).subscribe(
      response => {
        this.skillsManagementService.showToast('success',
          'Compétence ajoutée avec succé',
          `La compétence  ${this.positionSubSkill.skill.subSkilllabel} a été ajouté au position avec succcés`);
        this.getAllPositions();
        this.initPositionSubSkill();
      },
      error => {
        this.skillsManagementService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du l'ajout de compétence au position`);
      });
  }

  filterSubSkills(event) {
    this.getAllSkills();
  }

  onSelectSkills(event) {
    this.skillLevelList = event.skillLevels;
    this.positionSubSkill.level = null;
  }

  compareSkillLevel(a, b) {
    return a && b && a.skillLevelLabel == b.skillLevelLabel;
  }

  deletePositionSubSkill(position, positionSubSkill, rowIndex) {
    this.skillsManagementService.delete(SkillsManagementService.API_POSITION_SUB_SKILL + positionSubSkill.positionSubSkillId).subscribe(
      (response) => {
        position.positionSubSkills.splice(rowIndex, 1)
      },
      (error) => {
        this.skillsManagementService.showToast(
          "danger",
          "Erreur interne",
          `Un erreur interne a été produit lors de la suppression du compétences ${positionSubSkill.subSkill.subSkillLabel} de position`
        );
      }
    );
  }

  editPositionSubSkill(positionSubSkill) {
    this.skillsManagementService.post(SkillsManagementService.API_POSITION_SUB_SKILL, positionSubSkill).subscribe(
      response => {
        this.skillsManagementService.showToast('success',
          'Compétence modifiée avec succé',
          `La compétence  ${positionSubSkill.subSkill.subSkillLabel} du position a été modifiée avec succcés`);
        this.getAllPositions();
        this.initPositionSubSkill();
      },
      error => {
        this.skillsManagementService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du modification de compétence du position`);
      });
  }

  showBusinessUnitSkills(businessUnit) {
    this.showBusinessUnitSkillsWindow = true;
    console.log(businessUnit);
  }

  filterSkills($event, skillsGroup) {
    this.skillList=[];
    this.skillsGroupList.forEach(skillGroup =>{
      if(skillsGroup.id == skillGroup.skillsGroupId){
        this.skillList=skillGroup.skillList
      }
    })
  }

  onSelectSubSKill($event,businessUnit,skillsGroup) {
    let idBusinessUnit=businessUnit.businessUnitId;
    let idSkillGroup=skillsGroup.id;
    let idSubSkill=$event.subSkillId
    let businessUnitSkills:any={
      "businessunitId":idBusinessUnit,
      "skillsGroupId":idSkillGroup,
      "subSkillId":idSubSkill
    }
  this.organisationManagementService.post(UtilsService.API_BUSINESS_UNIT_SKILLS,businessUnitSkills).subscribe((sucess)=>{
console.log("---success----");

  },
  (error)=>{
    console.log("---error----");

  })
  }
  AddSkillBusinessUnit(businessUnit)
  {
    this.displayAddSkillsBusinessUnit=true;
    this.businessUnitSKill=businessUnit;
  }
  validerSkillsBusinessUnit()
  {}

}
