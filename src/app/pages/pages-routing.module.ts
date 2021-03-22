import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuardService } from '../services/auth/AuthGuard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'skills',
      loadChildren: () => import('./skills-management/skills-management.module')
        .then(m => m.SkillsManagementModule),
    },
    {
      path: 'performance',
      loadChildren: () => import('./performance-management/performance-management.module')
        .then(m => m.PerformanceManagementModule),
    },
    {
      path: 'evaluation',
      loadChildren: () => import('./evaluation-management/evaluation-management.module')
        .then(m => m.EvaluationManagementModule),
    },
    {
      path: 'organisation',
      loadChildren: () => import('./organisation-management/organisation-management.module')
        .then(m => m.OrganisationManagementModule),
    },
    {
      path: 'administration',
      loadChildren: () => import('./administration-management/administration-management.module')
        .then(m => m.AdministrationManagementModule),
    },
    {
      path:'positions',
      loadChildren: () => import('./position-management/position-management.module')
        .then(m => m.PositionManagementModule),
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
