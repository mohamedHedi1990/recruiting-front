import {
    Component, EventEmitter,
    Input, OnInit, Output
} from "@angular/core";
import { SkillLevel } from '../../../models/SkillLevel.model';

@Component({
  selector: "ngx-add-new-skills-group",
  templateUrl: "./add-new-skills-group.component.html",
  styleUrls: ["./add-new-skills-group.component.scss"],
})
export class AddNewskillsGroupComponent implements OnInit {
  @Input() skillsGroup = {
    skillsGroupId: null,
    skillsGroupLabel: null,
    skillsGroupDetails: null,
    skillsGroupCreatedAt: null,
    skillsGroupUpdatedAt: null,
    skillList: [],
    skillGroupLevels: [],
  };
  checkInValidSkills = false ;

  line = {
    skillLabel: null,
    skillCode: null,

  };
  lineLevel: SkillLevel = new SkillLevel(null, null, null, null, null);
  skillsList = [];
  @Input() titleHeaderskill:any;
  @Output() addNewSkillsGroupEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  @Output() deleteSkillEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {

  }
  initiateLine() {
    this.line = {
      skillLabel: null,
      skillCode: null,
    };
    this.line.skillLabel = null;
  }
  addLine() {
    
    this.skillsGroup.skillList.push(this.line);
    this.initiateLine();
  }
  addLineLevel() {

    this.skillsGroup.skillGroupLevels.push(this.lineLevel);
    this.lineLevel = new SkillLevel(null, null, null, null, null);
  }
  deleteLine(line) {
    for (let i = 0; i < this.skillsGroup.skillList.length; i++) {
      const element = this.skillsGroup.skillList[i];
      if (element != null && element === line) {
         
        this.skillsGroup.skillList.splice(i, 1);
        if(element.skillId!=null){
        this.deleteSkillEvent.emit(element);}
        break;
      }
    }
  }
  deleteLevelLine(levelLine: SkillLevel) {
    let index = -1;
    for (let i = 0; i < this.skillsGroup.skillGroupLevels.length; i++) {
      const skillLevel = this.skillsGroup.skillGroupLevels[i];
      if (skillLevel.skillLevelCode === levelLine.skillLevelCode) {
        index = i;
        break;
      }
    }
    this.skillsGroup.skillGroupLevels.splice(index, 1);
  }
  saveNewSkillsGroup() {
    this.addNewSkillsGroupEvent.emit(this.skillsGroup);
  }

  cancel() {
    this.cancelEvent.emit();
  }



  checkskillsGroupValid(): boolean {
    return (
      this.skillsGroup.skillsGroupLabel === "" || this.skillsGroup.skillsGroupLabel == null
    );
  }
  checkLineValid(): boolean {
    return (
      this.line.skillLabel === "" || this.line.skillLabel == null ||
      this.line.skillCode === "" || this.line.skillCode == null
    );
  }
  checkLineLevelValid(): boolean {
  return (
    this.lineLevel.skillLevelLabel === "" || this.lineLevel.skillLevelLabel == null ||
      this.lineLevel.skillLevelScore == null
  );
}
  
/*validIndicator()  {
  this.checkInValidSkills = false ;
  this.skillsGroup.skillList.forEach(element => {
    if(element.skillLabel == null || element.skillLabel == "" ||
    element.skillCode == null || element.skillCode == "" ){
        this.checkInValidSkills = true ;
        exit(1) ;
    }else{

    }
  });
}*/
}
