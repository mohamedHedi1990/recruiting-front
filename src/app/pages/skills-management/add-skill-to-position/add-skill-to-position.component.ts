import { Component, OnInit } from '@angular/core';
import { AssignedSubSkill } from '../../../models/AssignedSubSkill.model';
import { BusinessUnit } from '../../../models/BusinessUnit.model';
import { OrganisationManagementService } from "../../../services/organisation-management.service";
import { SkillsManagementService } from "../../../services/skills-management.service";
import { UtilsService } from '../../../services/utils.service';
import { BuisnessUnitListComponent } from '../../organisation-management/buisness-unit-list/buisness-unit-list.component';

@Component({
  selector: 'ngx-add-skill-to-position',
  templateUrl: './add-skill-to-position.component.html',
  styleUrls: ['./add-skill-to-position.component.scss']
})
export class AddSkillToPositionComponent implements OnInit {

  positions_list = []
  
  loading = false;
  
 
  businessUnitSKills : any = [];
  displayAddSkillsBusinessUnit=false;
 

  selectedBuisnessUnit: AssignedSubSkill = new AssignedSubSkill();
  assignedSkillsToBuisnessUnit : AssignedSubSkill[];
  constructor(private organisationManagementService: OrganisationManagementService, private skillsManagementService: SkillsManagementService)
   {
   
  }

  ngOnInit(): void {
    //this.getAllPositions();
    //this.getAllSkills()
    //this.getAllBusinessUnit();
    //this.getAllSkillsGroup();
    this.getBuisnessUnitWithAllAssignedSkills();
  }

  
  //Trouver les unités organisationelles avec les competences deja assignées
  getBuisnessUnitWithAllAssignedSkills() {
    this.skillsManagementService.getBuisnessUnitWithAllAssignedSkills().subscribe(response => {
      this.businessUnitSKills = response;
    }, error => {
      this.organisationManagementService.showToast(
        'danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de chargement des unités organisationelles avec leurs compétences assignées`
      );
    })
  }
//Trouver les compétences assignées à une unité fonctionelle
  getAssignedSkillsForBuisnessUnit() {
    this.skillsManagementService.getAssignedSkillsForBuisnessUnit(this.selectedBuisnessUnit.buisnessUnitId).subscribe(response => {
      this.assignedSkillsToBuisnessUnit = response;
      this.displayAddSkillsBusinessUnit = true;
    }, error => {
this.organisationManagementService.showToast(
          'danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de chargement des compétences assignées à cette unité fonctionnelle`
        );
    })
  }

  //Edit les compétences assignées à une unité fonctionelle
  validateSubSkillsModification() {
    this.skillsManagementService.updateSkillsForBuisnessUnit(this.selectedBuisnessUnit.buisnessUnitId, this.assignedSkillsToBuisnessUnit).subscribe(response => {
      this.displayAddSkillsBusinessUnit = false;
      this.getBuisnessUnitWithAllAssignedSkills();
      this.organisationManagementService.showToast('success',
      "Compétences modifiées avec succées",
      `La liste des compétences assignées à cette unité fonctionelle a été modifiée avec succcés`);
  }, error => {
this.organisationManagementService.showToast(
        'danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de chargement des compétences assignées à cette unité fonctionnelle`
      );
  })
  }

  //Cacher le modal d'edit des compétences
  cancelEditSkillsForBuisnessUnit() {
    this.displayAddSkillsBusinessUnit = false;
    this.selectedBuisnessUnit = null;
    this.assignedSkillsToBuisnessUnit = [];
  }

 
    

  /*getAllPositions() {
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
  }*/

  
  
  

  
  
  
  AddSkillBusinessUnit(businessUnit)
  {
    this.selectedBuisnessUnit = businessUnit;
    this.getAssignedSkillsForBuisnessUnit();
    
  }
  

}
