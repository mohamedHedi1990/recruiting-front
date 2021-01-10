import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { IndicatorAreaComponent } from './indicator-area/indicator-area.component';
import { IndicatorManagementComponent } from './indicator-management/indicator-management.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'indicator-group',
        component: IndicatorAreaComponent
       
      },
      {
        path: 'indicator-management',
        component: IndicatorManagementComponent
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
export class PerformanceManagementRoutingModule {
}
