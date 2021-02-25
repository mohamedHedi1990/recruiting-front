import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SkillsGroupComponent } from './skills-group/skills-group.component';
import { SkillsManagementComponent } from './skills-management/skills-management.component';
import {AddSkillToPositionComponent} from "./add-skill-to-position/add-skill-to-position.component";

export const routes: Routes = [
  {
  path: '',
  children: [
    {
      path: 'skills-group',
      component: SkillsGroupComponent,
    },
    {
      path: 'skills-management',
      component: SkillsManagementComponent,
    },{
      path:'add-skill-to-position',
      component:AddSkillToPositionComponent,
    }
  ],


}

];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillsManagementRoutingModule {
}
