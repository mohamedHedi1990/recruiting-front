import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListUsersComponent } from './list-users/list-users.component';
import { ProfilComponent } from './profil/profil.component';
import { JobListComponent } from './job-list/job-list.component';
import { DetailsOffreComponent } from './details-offre/details-offre.component';
import { StageListComponent } from './stage-list/stage-list.component';
import { MesOffresComponent } from './mes-offres/mes-offres.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { StatisticDashboardComponent } from './statistic-dashboard/statistic-dashboard.component';
import { DashboardCandidatByOffreComponent } from './dashboard-candidat-by-offre/dashboard-candidat-by-offre.component';
import { DashboardCandidatByDomainComponent } from './dashboard-candidat-by-domain/dashboard-candidat-by-domain.component';
import { ListCandidatComponent } from './list-candidat/list-candidat.component';
import { ListTraineeComponent } from './list-trainee/list-trainee.component';

export const routes: Routes = [
  {
    path: 'users-list',
      component: ListUsersComponent,
    },
    {
      path: 'profil',
      component: ProfilComponent,
    },
   
    {
      path: 'job-list',
      component: JobListComponent,
    },
    {
      path: 'stages-list',
      component: StageListComponent,
    },
    {
      path: 'candidat-list',
      component: ListCandidatComponent,
    },
    {
      path: 'trainee-list',
      component: ListTraineeComponent,
    },
    {
      path: 'job-details',
      component: DetailsOffreComponent,
    },
    {
      path: 'mes-offres',
      component: MesOffresComponent,
    },
    {
      path: 'calendrier',
      component: CalendrierComponent,
    },
    {
      path: 'statistic-offre-par-domain',
      component: StatisticDashboardComponent,
    },
    {
      path: 'statistic-candidat-par-offre',
      component: DashboardCandidatByOffreComponent,
    },
    {
      path: 'statistic-candidat-par-domain',
      component: DashboardCandidatByDomainComponent,
    },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationManagementRoutingModule {
}
