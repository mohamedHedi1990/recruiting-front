import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CompanyComponent } from './company/company.component';
import { BusinessUnitComponent } from './business-unit/business-unit.component';
import { CriteriaEvaluationComponent } from './criteria-evaluation/criteria-evaluation.component';
import { PositionComponent } from './position/position.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { PositionIndicatorQualitatifComponent } from './position-indicator-qualitatif/position-indicator-qualitatif.component';
import { PositionIndicatorQuantitatifComponent } from './position-indicator-quantitatif/position-indicator-quantitatif.component';
import { BuisnessUnitListComponent } from './buisness-unit-list/buisness-unit-list.component';
import {JobListComponent} from "./job-list/job-list.component";


export const routes: Routes = [
  {
  path: '',
  children: [
    {
      path: 'companies',
      component: CompanyComponent,
    },
    {
      path: 'business-units',
      component: BuisnessUnitListComponent,
    },

    {
      path: 'positions',
      component: PositionComponent,
    },
    {
      path: 'evaluation-criteria',
      component: CriteriaEvaluationComponent,
    },
    {
      path:'categories',
      component:ListCategoriesComponent,
    },
    {
      path:'position-indicator-qualitatif',
      component:PositionIndicatorQualitatifComponent
    },
    {
      path:'position-indicator-quantitatif',
      component:PositionIndicatorQuantitatifComponent
    },
    {
      path:'job-list',
      component:JobListComponent
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
export class OrganisationManagementRoutingModule {
}
