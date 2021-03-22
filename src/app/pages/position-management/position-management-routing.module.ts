import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MissionsComponent } from './missions/missions.component';

export const routes: Routes = [
  {
    path: 'missions-list',
      component: MissionsComponent,
    },


   






];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PositionManagementRoutingModule {
}
