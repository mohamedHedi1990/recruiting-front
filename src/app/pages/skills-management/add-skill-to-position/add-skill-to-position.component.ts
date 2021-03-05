import { Component, OnInit } from '@angular/core';
import {OrganisationManagementService} from "../../../services/organisation-management.service";
import {SkillsManagementService} from "../../../services/skills-management.service";

@Component({
  selector: 'ngx-add-skill-to-position',
  templateUrl: './add-skill-to-position.component.html',
  styleUrls: ['./add-skill-to-position.component.scss']
})
export class AddSkillToPositionComponent implements OnInit {

  positions_list=[]
  positionSubSkill={
    skill:null,
    level:null,
  }
  skillLevelList = [];
  skillsList = [];

  constructor(private organisationManagementService:OrganisationManagementService, private skillsManagementService: SkillsManagementService) { }

  ngOnInit(): void {
    this.getAllPositions();
    this.getAllSkills()
  }

  getAllPositions(){
    this.organisationManagementService.get(OrganisationManagementService.API_POSITION+'get-positions-with-sub-skills').subscribe(
      (response: any) => {
       this.positions_list=response;
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
  getAllSkills() {
    const context = this;
    this.skillsManagementService.getAll(SkillsManagementService.API_SKILL).subscribe( response => {
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
                           positionSubSkill.subSkill.subSkillId == this.positionSubSkill.skill.subSkillId );
  }
  positionContainsSubSkill(position){
    position.positionSubSkills.forEach(positionSubSkill => {
      if(positionSubSkill.subSkill.subSkillId == this.positionSubSkill.skill.subSkillId){
        return true;
      }
    })
    return false;
  }

 initPositionSubSkill() {
    this.positionSubSkill = {
      skill:null,
      level:null,
    };
  }
  savePositionSubSkill(position) {
   const positionSubSkill1 = {
     "positionId":position.positionId,
     "subSkill": this.positionSubSkill.skill,
     "requiredLevel":this.positionSubSkill.level,
     "local":true
   };
   this.skillsManagementService.post(SkillsManagementService.API_POSITION_SUB_SKILL,positionSubSkill1).subscribe(
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

  onSelectSkills(event)
  {
    this.skillLevelList=event.skillLevels;
    this.positionSubSkill.level=null;
  }

  compareSkillLevel(a, b) {
    return a && b && a.skillLevelLabel == b.skillLevelLabel;
  }

  deletePositionSubSkill(position,positionSubSkill,rowIndex){
    this.skillsManagementService.delete(SkillsManagementService.API_POSITION_SUB_SKILL+positionSubSkill.positionSubSkillId).subscribe(
      (response) => {
        position.positionSubSkills.splice(rowIndex,1)
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

  editPositionSubSkill(positionSubSkill){
    this.skillsManagementService.post(SkillsManagementService.API_POSITION_SUB_SKILL,positionSubSkill).subscribe(
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

}
