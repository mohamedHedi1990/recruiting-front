import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicatorAreaComponent } from './indicator-area/indicator-area.component';
import { IndicatorManagementComponent } from './indicator-management/indicator-management.component';
import {PerformanceManagementRoutingModule} from './performance-management-routing.module'

import { AddNewIndicatorAreaComponent } from './add-new-indicator-area/add-new-indicator-area.component';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from "@nebular/theme";
import { FormsModule } from "@angular/forms";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { PanelModule } from "primeng/panel";
import { DialogModule } from "primeng/dialog";
import {  DialogService, DynamicDialogModule } from "primeng/dynamicdialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { MiscellaneousModule } from '../miscellaneous/miscellaneous.module';
import { ConfirmationService } from 'primeng/api';
import { AddNewIndicatorPerformanceComponent } from './add-new-indicator-performance/add-new-indicator-performance.component';
import { FileUploadModule } from 'primeng/fileupload';


@NgModule({
  declarations: [IndicatorAreaComponent, IndicatorManagementComponent , AddNewIndicatorAreaComponent, AddNewIndicatorPerformanceComponent],
  
  imports: [
    CommonModule,
    PerformanceManagementRoutingModule,
    HttpClientModule,
    CommonModule,
    FileUploadModule,
    MatTableModule,
    NgbModule,
    ModalModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    FormsModule,
    Ng2SmartTableModule,
    PanelModule,
    DialogModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    TableModule,
    CheckboxModule,
    ButtonModule,
    MiscellaneousModule,
  ],
  providers: [
    DialogService,
    ConfirmationService,
  ],
})
export class PerformanceManagementModule { }
