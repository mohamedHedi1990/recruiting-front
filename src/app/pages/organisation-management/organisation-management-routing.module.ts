import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CompanyComponent } from './company/company.component';
import { BusinessUnitComponent } from './business-unit/business-unit.component';
import { CriteriaEvaluationComponent } from './criteria-evaluation/criteria-evaluation.component';

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
      path: 'evaluation-criteria',
      component: CriteriaEvaluationComponent,
    },
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
