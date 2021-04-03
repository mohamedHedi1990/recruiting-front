import { Component, OnInit } from '@angular/core';
import { SkillsManagementService } from '../../../services/skills-management.service';

@Component({
  selector: 'ngx-skills-matrix',
  templateUrl: './skills-matrix.component.html',
  styleUrls: ['./skills-matrix.component.scss']
})
export class SkillsMatrixComponent implements OnInit {

  constructor(private skillsManagementService: SkillsManagementService) { }
  skillsMatrix: any[] = null;
  ngOnInit(): void {
    this.getSkillsMatrix();
  }

  getSkillsMatrix() {
    this.skillsManagementService.getSkillsMatrix().subscribe(response => {
      this.skillsMatrix = response;
      console.log("this.skills matrix ", this.skillsMatrix);
    })
  }
}
