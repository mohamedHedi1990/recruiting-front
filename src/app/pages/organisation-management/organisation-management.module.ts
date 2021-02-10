import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrganisationManagementRoutingModule} from './organisation-management-routing.module';
import { CompanyComponent } from './company/company.component';
import { BusinessUnitComponent } from './business-unit/business-unit.component'
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {TreeModule} from 'primeng/tree';

import { NbMenuModule } from "@nebular/theme";
import {ContextMenuModule} from 'primeng/contextmenu';
//dependences
import { TableModule } from "primeng/table";
import { CheckboxModule } from "primeng/checkbox";
import { ButtonModule } from "primeng/button";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatTableModule } from "@angular/material";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ModalModule } from "ngx-bootstrap/modal";
import localeFr from "@angular/common/locales/fr";
import localeFrExtra from "@angular/common/locales/extra/fr";
import { registerLocaleData } from "@angular/common";
registerLocaleData(localeFr, "fr", localeFrExtra);
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
import { AuthServiceService } from '../../services/auth/auth-service.service';
import { AuthGuardService } from '../../services/auth/AuthGuard.service';
import { InterceptService } from '../../services/auth/InterceptService.service';
import { ConfirmationService } from 'primeng/api';
import { AddNewCompanyComponent } from './add-new-company/add-new-company.component';
import { AddNewBusinessUnitComponent } from './add-new-business-unit/add-new-business-unit.component';
import { CriteriaEvaluationComponent } from './criteria-evaluation/criteria-evaluation.component';

@NgModule({
  declarations: [CompanyComponent, BusinessUnitComponent, AddNewCompanyComponent, AddNewBusinessUnitComponent, CriteriaEvaluationComponent],
  imports: [
    CommonModule,
    OrganisationManagementRoutingModule,

    NbMenuModule,
    TableModule,
    CheckboxModule,
    ButtonModule,
    HttpClientModule,
    CommonModule,
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
    TreeModule,
    ContextMenuModule,
  ],
  providers: [
    DialogService,
    ConfirmationService,
    AuthGuardService,
    AuthServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },

  ],
})
export class OrganisationManagementModule { }
