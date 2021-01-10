import { UtilsService } from "./../../../services/utils.service";
import { Component, OnInit } from "@angular/core";
import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
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
  displayDeleteSkillsGroupInvoice = false;
  constructor(private UtilsService: UtilsService) {}

  ngOnInit(): void {
    this.initSkillsGroup();
    this.getAllSkillsGroup();
  }

  getAllSkillsGroup() {
    const context = this;
    this.UtilsService.get(UtilsService.API_SKILLS_GROUP).subscribe(
      (response) => {
        context.skillsGroupList = response;
        console.log("liste des skillsGroup------", context.skillsGroupList);
      },
      (error) => {
        this.UtilsService.showToast(
          "danger",
          "Erreur interne",
          `Un erreur interne a été produit lors du chargement des famille des compétences`
        );
      }
    );
  }

  initSkillsGroup() {
    this.skillsGroup = {
      skillsGroupId: null,
    skillsGroupLabel: null,
    skillsGroupCode: null,
    skillsGroupDetails: null,
    };
  }

  editSkillsGroup(rowskillsGroup) {
 
   this.skillsGroup=rowskillsGroup;
    this.displayAddNewSkillsGroupModal = true;
    this.titleHeader = "Modification d'une famille de compétences ";
  
  }
  delSkillsGroup() {
    const url =
    UtilsService.API_SKILLS_GROUP + "/" + this.skillsGroup.skillsGroupId;
  this.UtilsService.delete(url).subscribe(
    (response) => {
      if (response.MESSAGE === 'DELETED') {
        this.UtilsService.showToast(
          "success",
          "Famille de compétences supprimée avec succés",
          `La Famille de compétences  ${this.skillsGroup.skillsGroupLabel} a été supprimée avec succcés`
        );
      } else if (response.MESSAGE === 'NOT_EMPTY') {
        this.UtilsService.showToast(
          "danger",
          "Famille de compétences non vide",
          `Des compétences reliées à la famille de compétences  ${this.skillsGroup.skillsGroupLabel} ont été trouvés. Merci de les supprimer ou de l'associer à des autres familles avant de supprimer cette famille de compétence.`
        );
      }
      
      this.displayDeleteSkillsGroupInvoice = false;
      this.initSkillsGroup();
     this.getAllSkillsGroup();
    },
    (error) => {
      console.log('error ',  error);
      this.UtilsService.showToast(
        "danger",
        "Erreur interne",
        `Un erreur interne a été produit lors de la suppression de famille de compétences  ${this.skillsGroup.skillsGroupLabel}`
      );
      this.displayDeleteSkillsGroupInvoice = false;
      this.initSkillsGroup();
      this.getAllSkillsGroup();
    }
  );
  }
  deleteSkillsGroup(rowdata) {
    this.skillsGroup = rowdata;
    this.displayDeleteSkillsGroupInvoice = true;
  }

  addNewSkillsGroup() {
    this.initSkillsGroup();
    this.displayAddNewSkillsGroupModal = true;
    this.titleHeader = "Nouvelle famille des compétences";
  }
  hideAddNewSkillsGroupModal() {
    this.displayAddNewSkillsGroupModal = false;
    this.getAllSkillsGroup();
  }
  ImportNewSkillsGroup() {}

  saveNewSkillsGroup(skillsGroup) {
    const context = this;
    console.log("famille de compétences à sauvgarder ", skillsGroup);
    this.UtilsService.post(
      UtilsService.API_SKILLS_GROUP,
      this.skillsGroup
    ).subscribe(
      (response) => {
        console.log(
          "la valeur de famille de compétences enregistrée",
          response
        );
        context.displayAddNewSkillsGroupModal = false;
        context.initSkillsGroup();
        context.getAllSkillsGroup();
      },
      (error) => {
        this.UtilsService.showToast(
          "danger",
          "Erreur interne",
          `Un erreur interne a été produit lors du sauvgarde de famille des compétences`
        );
        context.displayAddNewSkillsGroupModal = false;
        context.initSkillsGroup();
      }
    );
  }

}
