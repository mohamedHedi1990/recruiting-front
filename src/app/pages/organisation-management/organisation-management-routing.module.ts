import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CompanyComponent } from './company/company.component';
import { BusinessUnitComponent } from './business-unit/business-unit.component';
import { CriteriaEvaluationComponent } from './criteria-evaluation/criteria-evaluation.component';
import { PositionComponent } from './position/position.component';
import { PositionCategoryComponent } from './position-category/position-category.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';

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
      component: BusinessUnitComponent,
    },
    {
      path: 'position-categories',
      component: PositionCategoryComponent,
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
