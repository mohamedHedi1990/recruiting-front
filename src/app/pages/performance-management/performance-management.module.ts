import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicatorAreaComponent } from './indicator-area/indicator-area.component';
import { IndicatorManagementComponent } from './indicator-management/indicator-management.component';
import {PerformanceManagementRoutingModule} from './performance-management-routing.module'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthServiceService } from '../../services/auth/auth-service.service';
import { AuthGuardService } from '../../services/auth/AuthGuard.service';
import { InterceptService } from '../../services/auth/InterceptService.service';


@NgModule({
  declarations: [IndicatorAreaComponent, IndicatorManagementComponent],
  imports: [
    CommonModule,
    PerformanceManagementRoutingModule
  ],
   providers:[
    AuthGuardService,
    AuthServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },

  ],
})
export class PerformanceManagementModule { }
