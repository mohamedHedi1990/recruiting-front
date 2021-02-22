import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from "@angular/core";
import { SkillsManagementService } from "../../../services/skills-management.service";
import { UtilsService } from "./../../../services/utils.service";
@Component({
  selector: "ngx-add-new-skill",
  templateUrl: "./add-new-skill.component.html",
  styleUrls: ["./add-new-skill.component.scss"],
})
export class AddNewSkillComponent implements OnInit {
  @Input() skill = {
    skillId: null,
    skillLabel: null,
    skillCode: null,
    skillDetails: null,
    skillsGroup: null,
    CreatedAt: null,
    UpdatedAt: null,
    subSkillsTable: [],
    subSkills: [],
  };
  skillsGroupList = [];
  line = {
    subSkillId: null,
    subSkillLabel: null,
    subSkillCode: null,
  };
  skillsList = [];
  @Input() titleHeadersubSkill: any;
  @Output() addNewSkillsGroupEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  @Output() deleteSkillEvent = new EventEmitter();


  constructor(private UtilsService: UtilsService,private skillsManagementService : SkillsManagementService) {}

  ngOnInit(): void {this.getAllSkillsGroup();}
  initiateLine() {
    this.line = {
      subSkillId: null,
      subSkillLabel: null,
      subSkillCode: null,
    };
  }
  addLine() {
    this.line.subSkillCode = this.line.subSkillLabel;
    this.skill.subSkills.push(this.line);
    this.initiateLine();
  }
  deleteLine(line) {
    for (let i = 0; i < this.skill.subSkills.length; i++) {
      const element = this.skill.subSkills[i];
      if (element != null && element === line) {
        this.skill.subSkills.splice(i, 1);
        break;
      }
    }
    
    if(line.subSkillId){
      this.skillsManagementService.delete(SkillsManagementService.API_SUB_SKILL+line.subSkillId).subscribe(
        (response) => {
          if (response.MESSAGE === 'DELETED') {
            this.skillsManagementService.showToast(
              "success","Compétence supprimée avec succés",
              `La sous compétence  ${line.subSkillLabel} a été supprimée avec succcés`
            );
          } 
        },
        (error) => {
          console.log('error ', error);
          this.skillsManagementService.showToast(
            "danger","Erreur interne",
            `Un erreur interne a été produit lors de la suppression de sous compétence  ${line.subSkillLabel}`
          );});
      
    }

  }

  saveNewskill() {
    this.addNewSkillsGroupEvent.emit(this.skill);
  }

  getAllSkillsGroup() {
    const context = this;
    this.skillsManagementService.getAll(SkillsManagementService.API_SKILLS_GROUP).subscribe(
      (response) => {
        context.skillsGroupList = response;
        if(context.skillsGroupList.length !== 0) {
          if(this.skill.skillId != null) {
            this.skill.skillsGroup = context.skillsGroupList[0];
          }
        }
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

  cancel() {
    this.cancelEvent.emit();
  }

  checkskillValid(): boolean {
    return this.skill.skillLabel === "" || this.skill.skillLabel == null ||
    this.skill.skillCode === "" || this.skill.skillCode == null;
  }
  checkLineValid(): boolean {
    return this.line.subSkillLabel === "" || this.line.subSkillLabel == null||
    this.line.subSkillCode=== "" || this.line.subSkillCode == null;
  }
  compareSkillsGroup(a: any, b: any): boolean {
    if (a == null || b == null) return true;
    return a.SkillsGroupId === b.SkillsGroupId;
  }
}
