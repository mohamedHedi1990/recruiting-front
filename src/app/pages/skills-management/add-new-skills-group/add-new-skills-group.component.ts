import { Component, OnInit } from "@angular/core";
import {
  EventEmitter,
  Input,
  Output
} from "@angular/core";

import { exit } from "process";
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
  };
  checkInValidSkills = false ;

  line = {
    skillLabel: null,
    skillCode: null,

  };
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
  
validIndicator()  {
  this.checkInValidSkills = false ;
  this.skillsGroup.skillList.forEach(element => {
    if(element.skillLabel == null || element.skillLabel == "" ||
    element.skillCode == null || element.skillCode == "" ){
        this.checkInValidSkills = true ;
        exit(1) ;
    }else{

    }
  });
}
}
