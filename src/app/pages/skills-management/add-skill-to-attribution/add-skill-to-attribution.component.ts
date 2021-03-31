import {Component, Input, OnInit} from '@angular/core';
import {OrganisationManagementService} from "../../../services/organisation-management.service";
import {SkillsManagementService} from "../../../services/skills-management.service";
import {control} from "leaflet";
import attribution = control.attribution;

@Component({
  selector: 'ngx-add-skill-to-attribution',
  templateUrl: './add-skill-to-attribution.component.html',
  styleUrls: ['./add-skill-to-attribution.component.scss']
})
export class AddSkillToAttributionComponent implements OnInit {

  @Input() position;

  availableSkills= [];
  availableSkillsGroup=[];
  loading = false;
  attributionSubSkill = {
    'attributionId' : null ,
    'requiredLevel' : null,
    'isEvaluated' : false,
    'subSkill' : null,
    'skillsGroup' : null,
  };
  selectedAttribution: any = null;

  attributionsSKills : any[] = [];

  constructor(private organisationManagementService: OrganisationManagementService, private skillsManagementService: SkillsManagementService)
  {
  }

  ngOnInit(): void {
    this.getPositionAttributionsWithAllAssignedSkills();
  }

  //Trouver les attribution avec les competences deja assignées
  getPositionAttributionsWithAllAssignedSkills() {
    this.skillsManagementService.getPositionAttributionWithAllAssignedSkills(this.position.positionId).subscribe(response => {
      this.attributionsSKills = response;
      if(this.selectedAttribution == null){
        this.selectedAttribution=this.attributionsSKills[0];
      }
      this.getSelectedSkill();
    }, error => {
      this.organisationManagementService.showToast(
        'danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de chargement des attribution avec leurs compétences assignées`
      );
    })
  }

  getSelectedSkill(){
    if(this.selectedAttribution != null && this.selectedAttribution.attributionId != null){
      this.attributionsSKills.forEach( attribution => {
        if(attribution.attributionId == this.selectedAttribution.attributionId){
          this.selectedAttribution = attribution;
        }
      });
    }
  }

  compareSkillGroup(a, b) {
    return a && b && a.skillsGroupLabel == b.skillsGroupLabel;
  }
  compareAttribution(a, b) {
    return a && b && a.attributionLabel == b.attributionLabel;
  }
  compareSkillLevel(a, b) {
    return a && b && a.skillLevelLabel == b.skillLevelLabel;
  }

  editAttributionSubSkill(attributionSubSKill){
    this.skillsManagementService.editAttributionSkill(attributionSubSKill).subscribe(response => {
        this.organisationManagementService.showToast('success',
          "Compétence d'attribution modifiée avec succées",
          `La compétence à éte assignée à cette attribution avec succcés`);
        this.getPositionAttributionsWithAllAssignedSkills();
    }, error => {
      this.organisationManagementService.showToast(
        'danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de l'ajout de compétences à l'attribution`
      );
    })
  }

  filterSubSkills($event,attribution){
    this.availableSkills=attribution.availableSkills;
  }
  filterSkillsGroup($event,attribution){
    this.availableSkillsGroup=attribution.availableSkills;
  }

  onSelectSkillGroup(){
    this.availableSkills=this.attributionSubSkill.skillsGroup.skillList
  }

  saveAttributionSubSkill(attribution){
    let attributionSubSKill={
      'isEvaluated': this.attributionSubSkill.isEvaluated,
      'requiredLevel': this.attributionSubSkill.requiredLevel,
      'skillsGroup': this.attributionSubSkill.skillsGroup,
      'subSkill': this.attributionSubSkill.subSkill,
      'attributionId':  attribution.attributionId,
    };

    this.skillsManagementService.addSkillToAttribution(attributionSubSKill).subscribe(response => {
      if(response == null){
        this.organisationManagementService.showToast(
          'danger',
          'Compétence déja affecté',
          `La compétence à été déja assignée à l'attribution`
        );
      }
      else {
        this.organisationManagementService.showToast('success',
          "Compétence assignée avec succées",
          `La compétence à éte assignée à cette attribution avec succcés`);
        this.getPositionAttributionsWithAllAssignedSkills();
      }
    }, error => {
      this.organisationManagementService.showToast(
        'danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de l'ajout de compétences à l'attribution`
      );
    })
  }

  deleteAttributionSubSkill(attributionSubSkill){
    this.skillsManagementService.deleteSkillFromAttribution(attributionSubSkill.attributionSubSkillId).subscribe(response => {
      this.organisationManagementService.showToast('success',
        "Compétence supprimée avec succées",
        `La compétence à éte supprimée de cette attribution avec succcés`);
      this.getPositionAttributionsWithAllAssignedSkills();
    }, error => {
      this.organisationManagementService.showToast(
        'danger',
        'Erreur interne',
        `Un erreur interne a été produit lors du suppression de compétences d'attribution`
      );
    })
  }

  checkValidAttributionSubSkill(attribution){
    return this.attributionSubSkill.skillsGroup == null ||
      this.attributionSubSkill.subSkill == null ||
      this.attributionSubSkill.requiredLevel == null;
  }

}
