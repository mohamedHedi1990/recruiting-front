import { UtilsService } from "./../../../services/utils.service";
import { Component, OnInit } from "@angular/core";
import { SkillsManagementService } from "../../../services/skills-management.service";
import { ConfirmationService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { SkillLevel } from '../../../models/SkillLevel.model';
@Component({
  selector: "ngx-skills-group",
  templateUrl: "./skills-group.component.html",
  styleUrls: ["./skills-group.component.scss"],
})
export class SkillsGroupComponent implements OnInit {
skillsGroup = null;
skillsGroupList = [];
rowskillsGroup = null;
loading = false;
titleHeader: any;
displayAddNewSkillsGroupModal = false;
displayDeleteSkillsGroupModal = false;
skills = []
skill = {
  skillId: null,
  skillLabel: null,
  skillCode: null,
  skillDetails: null,
  skillsGroup: null
};
titleHeaderskill:any;
constructor(private skillsManagementService : SkillsManagementService,public dialogService: DialogService,
  private confirmationService: ConfirmationService) { }

ngOnInit(): void {
  this.initSkillsGroup();
  this.getAllSkillsGroup();
}

getAllSkillsGroup() {
  const context = this;
  context.skillsManagementService.getAll(SkillsManagementService.API_SKILLS_GROUP).subscribe(
    (response) => {
      context.skillsGroupList = response;

    },
    (error) => {
      this.skillsManagementService.showToast(
        "danger",
        "Erreur interne",
        `Un erreur interne a été produit lors du chargement des famille des compétences`
      );
    }
  );
}



editSkillsGroup(skillsGroup) {

  this.skillsGroup = skillsGroup;
  this.titleHeaderskill="Modifier la liste de compétences pour cette famille";
  this.displayAddNewSkillsGroupModal = true;
  this.titleHeader = "Modification d'une famille de compétences ";
}
deleteSkillsGroup(skillsGroup) {
  this.skillsGroup = skillsGroup;
  this.displayDeleteSkillsGroupModal = true;
}
delSkillsGroup() {
  this.skillsManagementService.delete(SkillsManagementService.API_SKILLS_GROUP+this.skillsGroup.skillsGroupId).subscribe(
    (response) => {

      if (response.MESSAGE === 'DELETED') {
        this.skillsManagementService.showToast(
          "success","Famille de compétences supprimée avec succés",
          `La famille de compétences  ${this.skillsGroup.skillsGroupLabel} a été supprimée avec succcés`
        );
      } else if (response.MESSAGE === 'NOT_EMPTY') {
        this.skillsManagementService.showToast(
          "danger","Famille de compétences non vide",
          `Des compétences reliées à la famille de compétences  ${this.skillsGroup.skillsGroupLabel} ont été trouvés. Merci de les supprimer ou de l'associer à des autres familles avant de supprimer cette famille de compétence.`
        );
      }

      this.displayDeleteSkillsGroupModal = false;
      this.initSkillsGroup();
      this.getAllSkillsGroup();
    },
    (error) => {
      console.log('error ', error);
      this.skillsManagementService.showToast(
        "danger","Erreur interne",
        `Un erreur interne a été produit lors de la suppression de famille de compétences  ${this.skillsGroup.skillsGroupLabel}`
      );
      this.displayDeleteSkillsGroupModal = false;
      this.initSkillsGroup();
    });
}

  addNewSkillsGroup() {
    this.initSkillsGroup();
    this.titleHeaderskill="Ajouter des compétences pour cette famille";
    this.displayAddNewSkillsGroupModal = true;
    this.titleHeader = "Nouvelle famille des compétences";
  }
  hideAddNewSkillsGroupModal() {
    this.displayAddNewSkillsGroupModal = false;
  }
  ImportNewSkillsGroup() { }

  saveNewSkillsGroup(skillsGroup) {
    const context = this;

      this.skillsManagementService.post(SkillsManagementService.API_SKILLS_GROUP, this.skillsGroup).subscribe(
        (response) => {


          this.skillsManagementService.showToast('success',
          'Famille de compétences enregistrée avec succés',
          `La famille de compétences   ${this.skillsGroup.skillsGroupLabel} a été enregistrée avec succcés`);
          context.initSkillsGroup();
          context.getAllSkillsGroup();
          context.displayAddNewSkillsGroupModal = false;
        },
        (error) => {
          this.skillsManagementService.showToast('danger',
          'Erreur Interne',
          `Un erreur interne a été produit lors de la sauvgarde de famille de compétence    ${this.skillsGroup.skillsGroupLabel} `);

        });
  }


deleteSkill(skill){

  this.skillsManagementService.delete(SkillsManagementService.API_SKILL+skill.skillId).subscribe(
    (response) => {
      if (response.MESSAGE === 'DELETED') {
        this.skillsManagementService.showToast(
          "success","Compétence supprimée avec succés",
          `La Compétence  ${skill.skillLabel} a été supprimée avec succcés`
        );
      } else if (response.MESSAGE === 'NOT_EMPTY') {
        this.skillsManagementService.showToast(
          "danger", "La Compétence non vide",
          `Des sous compétences reliées à la compétence  ${skill.skillLabel} ont été trouvés. Merci de les supprimer ou de l'associer à des autres familles avant de supprimer cette famille de compétence.`
        );
      }
    },
    (error) => {
      console.log('error ', error);
      this.skillsManagementService.showToast(
        "danger","Erreur interne",
        `Un erreur interne a été produit lors de la suppression de compétence  ${skill.skillLabel}`
      );});
}

initSkillsGroup() {
  this.skillsGroup = {
    skillsGroupId: null,
    skillsGroupLabel: null,
    skillsGroupCode: null,
    skillsGroupDetails: null,
    CreatedAt: null,
    UpdatedAt: null,
    skillList: [],
    skillGroupLevels: [],
  };

  // initiate default skill level
  this.skillsGroup.skillGroupLevels.push(new SkillLevel("Débutant", "DEBUTANT", "Connait certains concepts du domaine de compétences mais il n'est pas capable d'opérer d'une façon indépendante. Les tâches sont généralement effectuées sous supervision.",
    50, 1));
  this.skillsGroup.skillGroupLevels.push(new SkillLevel("Intermédiaire", "INTERMEDIAIRE", "Possède une bonne compréhension de certaines compétences et il est capable de les appliquer efficacement dans sa fonction. Il devrait utiliser ces compétences fréquemment afin d'accomplir ses tâches d'une façon partiellement autonome.",
    75, 2));
  this.skillsGroup.skillGroupLevels.push(new SkillLevel("Professionel", "PROFESSIONNEL", " Possède une compréhension très détaillée et approfondie du domaine de compétences et il est capable de l'appliquer avec une efficacité considérable dans sa fonction. Sert de modèle pour certaines compétences et peut conseiller ou former les autres.",
    100, 3));
  this.skillsGroup.skillGroupLevels.push(new SkillLevel("Expert", "EXPERT", "Possède une compréhension très détaillée et approfondie du domaine de compétences et est capable de l'appliquer avec une efficacité considérable dans le poste. Sert de modèle pour certaines compétences et démontre un haut niveau de compréhension pour effectuer des tâches entièrement indépendantes. Peut conseiller ou former les autres.",
    120, 4));
}


}
