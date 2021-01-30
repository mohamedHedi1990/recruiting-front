import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdministrationManagementRoutingModule} from './administration-management-routing.module';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { ListUsersComponent } from './list-users/list-users.component'

import {CardModule} from 'primeng/card';
import { NbMenuModule } from "@nebular/theme";

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
import { DatePipe, registerLocaleData } from "@angular/common";
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
import { DialogModule } from "primeng/dialog";
import { DialogService, DynamicDialogModule } from "primeng/dynamicdialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { AuthServiceService } from '../../services/auth/auth-service.service';
import { AuthGuardService } from '../../services/auth/AuthGuard.service';
import { InterceptService } from '../../services/auth/InterceptService.service';
import {Ng2TelInputModule} from 'ng2-tel-input';

@NgModule({
  declarations: [AddNewUserComponent, ListUsersComponent],
  imports: [
    CommonModule,
    AdministrationManagementRoutingModule,
    NbMenuModule,
    TableModule,
    CheckboxModule,
    ButtonModule,
    HttpClientModule,
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
    CardModule,
    Ng2TelInputModule
  
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
export class AdministrationManagementModule { }
