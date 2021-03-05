import { Component, OnInit } from '@angular/core';
import {SkillsManagementService} from "../../../services/skills-management.service";
import {OrganisationManagementService} from "../../../services/organisation-management.service";
import {SlicePipe} from "@angular/common";
import { Filter } from '../../../models/CompanyBUFilter.model';

@Component({
  selector: 'ngx-skills-referential',
  templateUrl: './skills-referential.component.html',
  styleUrls: ['./skills-referential.component.scss']
})
export class SkillsReferentialComponent implements OnInit {

  positionSubSkills=[];
  subSkills=[]
  referential= [];
  companies=[];
  businessUnitList
  filter = new Filter();
  constructor(private skillsService:SkillsManagementService,private organisationService:OrganisationManagementService) { }

  ngOnInit(): void {
    //this.getAllPositionSubSkill();
    //this.getAllSubSkills();
    this.getCompanies();
  }

  getBuisnessUnitsByCompany() {
    this.organisationService.get(OrganisationManagementService.API_COMPANY + this.filter.company.companyId + '/business-unit-list').subscribe(response => {
      this.filter.company.businessUnitList = response;
      this.filter.businesUnit = this.filter.company.businessUnitList[0];
      this.getReferential();
    })
  }

  getCompanies(){
    this.organisationService.get(OrganisationManagementService.API_COMPANY).subscribe(
      (response: any) => {
        this.companies = response;
        this.filter.company = this.companies[0];
        this.getBuisnessUnitsByCompany();
        //this.filter.businesUnit=this.filter.company.businessUnitList[0]
        
      },
      (error) => {
        this.organisationService.showToast(
          'danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du l'importation des societes`
        );
      }
    );

  }

  getReferential(){
    this.organisationService.get(OrganisationManagementService.API_POSITION+'get-referential/'+this.filter.businesUnit.businessUnitId).subscribe(
      (response: any) => {
        this.referential=response;
      },
      (error) => {
        this.organisationService.showToast(
          'danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du l'importation du referentiel`
        );
      }
    );

  }

  getAllPositionSubSkill(){
    this.organisationService.get(OrganisationManagementService.API_POSITION+'get-positions-with-sub-skills').subscribe(
      (response: any) => {
        this.positionSubSkills=response;
      },
      (error) => {
        this.organisationService.showToast(
          'danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du l'importation des positions`
        );
      }
    );

  }

  getAllSubSkills(){
    this.skillsService.getAll(SkillsManagementService.API_SUB_SKILL).subscribe(
      (response) => {
        this.subSkills=response;
      },
      (error) => {
        this.skillsService.showToast(
          "danger","Erreur interne",
          `Un erreur interne a été produit lors du l'importation du sous compétence`);
      }
    )
  }
  getLevel(position,subSkill){
    let level=""
     position.positionSubSkills.forEach(positionSubSkill=>{
       if(positionSubSkill.subSkill.subSkillId == subSkill.subSkillId){
         level= positionSubSkill.requiredLevel.skillLevelLabel;
       }
     });
    return level;
}

  compareCompany(a, b) {
    return a && b && a.skillLevelLabel == b.skillLevelLabel;
  }

  compareBusinessUnit(a, b) {
    return a && b && a.businessUnitLabel == b.businessUnitLabel;
  }

  onSelectCompany() {
    this.filter.businesUnit = this.filter.company.businessUnitList[0]
    this.getReferential();
  }

}
