import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MissionsComponent } from './missions/missions.component';
import { AttributionsComponent } from './attributions/attributions.component';

export const routes: Routes = [
  {
    path: '',
    children: [
  {
    path: 'missions-list',
      component: MissionsComponent,
    },
    {
      path: 'attributions-list',
        component: AttributionsComponent,
      }
    ]}
  ]

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PositionManagementRoutingModule {
}
