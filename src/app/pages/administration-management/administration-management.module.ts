import { NgModule } from '@angular/core';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { ListUsersComponent } from './list-users/list-users.component'

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
import { AdministrationManagementRoutingModule } from './administration-management-routing.module';
import {DragDropModule} from 'primeng/dragdrop';
import {LOCALE_ID} from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { ProfilComponent } from './profil/profil.component';
import { JobListComponent } from './job-list/job-list.component';
import { AddJobComponent } from './add-job/add-job.component';
import {EditorModule} from 'primeng/editor';
import { DetailsOffreComponent } from './details-offre/details-offre.component';
import {TabViewModule} from 'primeng/tabview';
import { StageListComponent } from './stage-list/stage-list.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {CalendarModule} from 'primeng/calendar';
import { CalendrierComponent } from './calendrier/calendrier.component';
import {FullCalendarModule} from 'primeng/fullcalendar';
import { MesOffresComponent } from './mes-offres/mes-offres.component';
import { StatisticDashboardComponent } from './statistic-dashboard/statistic-dashboard.component';
import {ChartModule} from 'primeng/chart';
import { DashboardCandidatByOffreComponent } from './dashboard-candidat-by-offre/dashboard-candidat-by-offre.component';
import { DashboardCandidatByDomainComponent } from './dashboard-candidat-by-domain/dashboard-candidat-by-domain.component';
import { ListCandidatComponent } from './list-candidat/list-candidat.component';
import { AddCandidatComponent } from './add-candidat/add-candidat.component';
import { ListTraineeComponent } from './list-trainee/list-trainee.component';
import { AddTraineeComponent } from './add-trainee/add-trainee.component';
import { MessageListComponent } from './message-list/message-list.component';

registerLocaleData(localeFr, 'fr', localeFrExtra);

@NgModule({
  declarations: [AddNewUserComponent,ListUsersComponent, ProfilComponent, JobListComponent, AddJobComponent, DetailsOffreComponent, StageListComponent, CalendrierComponent,MesOffresComponent, StatisticDashboardComponent, DashboardCandidatByOffreComponent, DashboardCandidatByDomainComponent, ListCandidatComponent, AddCandidatComponent, ListTraineeComponent, AddTraineeComponent, MessageListComponent],
  imports: [
    CalendarModule,
    PdfViewerModule,
    CommonModule,
    AdministrationManagementRoutingModule,
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
    DragDropModule,
    EditorModule,
    TableModule,
    TabViewModule,
    FullCalendarModule,ChartModule

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
export class AdministrationManagementModule { }
