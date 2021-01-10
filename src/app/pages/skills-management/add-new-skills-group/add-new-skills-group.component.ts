import { Component, OnInit } from "@angular/core";
import {
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { UtilsService } from "./../../../services/utils.service";
@Component({
  selector: "ngx-add-new-skills-group",
  templateUrl: "./add-new-skills-group.component.html",
  styleUrls: ["./add-new-skills-group.component.scss"],
})
export class AddNewskillsGroupComponent implements OnInit {
  @Input() skillsGroup = {
    skillsGroupId: null,
    skillsGroupLabel: null,
    skillsGroupCode: null,
    skillsGroupDetails: null,
  };
  @Output() addNewSkillsGroupEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  saveNewSkillsGroup() {
    this.addNewSkillsGroupEvent.emit(this.skillsGroup);
  }

  cancel() {
    this.cancelEvent.emit();
  }

  checkCode() {
    console.log("formulation de code apartir de label");

    this.skillsGroup.skillsGroupCode = this.skillsGroup.skillsGroupLabel
      .toUpperCase()
      .replaceAll(" ", "_");
  }

  checkskillsGroupValid(): boolean {
    return (
      this.skillsGroup.skillsGroupLabel === "" ||
      this.skillsGroup.skillsGroupCode === "" ||
      this.skillsGroup.skillsGroupLabel == null ||
      this.skillsGroup.skillsGroupCode == null
    );
  }
}
