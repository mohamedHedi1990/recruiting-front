import { NgModule } from '@angular/core';

import {CardModule} from 'primeng/card';
import { CommonModule} from '@angular/common';
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
import {DragDropModule} from 'primeng/dragdrop';
import {LOCALE_ID} from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { MissionsComponent } from './missions/missions.component';
import { PositionManagementRoutingModule } from './position-management-routing.module';
import { AttributionsComponent } from './attributions/attributions.component';
registerLocaleData(localeFr, 'fr', localeFrExtra);

@NgModule({
  declarations: [MissionsComponent, AttributionsComponent],
  imports: [
    CommonModule,
   PositionManagementRoutingModule,
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
    CardModule,
    Ng2TelInputModule,
    DragDropModule
  ],
  providers: [
    UtilsService,
    DialogService,
    ConfirmationService,
    AuthGuardService,
    AuthServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
    { provide: LOCALE_ID, useValue: "fr-FR" }

  ],
})
export class PositionManagementModule { }
