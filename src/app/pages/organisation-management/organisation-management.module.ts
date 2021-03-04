import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrganisationManagementRoutingModule} from './organisation-management-routing.module';
import { CompanyComponent } from './company/company.component';
import { BusinessUnitComponent } from './business-unit/business-unit.component'
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {TreeModule} from 'primeng/tree';

import { NbMenuModule, NbStepperModule } from "@nebular/theme";
import {ContextMenuModule} from 'primeng/contextmenu';
//dependences
import { TableModule } from "primeng/table";
import { CheckboxModule } from "primeng/checkbox";
import { ButtonModule } from "primeng/button";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatStepperModule, MatTableModule } from "@angular/material";
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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { PanelModule } from "primeng/panel";
import { AuthServiceService } from '../../services/auth/auth-service.service';
import { AuthGuardService } from '../../services/auth/AuthGuard.service';
import { InterceptService } from '../../services/auth/InterceptService.service';
import { ConfirmationService } from 'primeng/api';
import { AddNewCompanyComponent } from './add-new-company/add-new-company.component';
import { AddNewBusinessUnitComponent } from './add-new-business-unit/add-new-business-unit.component';

import { CriteriaEvaluationComponent } from './criteria-evaluation/criteria-evaluation.component';
import { CardModule } from 'primeng/card';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { DragDropModule } from 'primeng/dragdrop';
import { ListCategoriesComponent } from './list-categories/list-categories.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { PositionComponent } from './position/position.component';
import { PositionListTableComponent } from './position-list-table/position-list-table.component';
import { PositionListTreeComponent } from './position-list-tree/position-list-tree.component';
import { AddNewPositionComponent } from './add-new-position/add-new-position.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropdownModule } from 'primeng/dropdown';

import {TabViewModule} from 'primeng/tabview';
import { PositionIndicatorQuantitatifComponent } from './position-indicator-quantitatif/position-indicator-quantitatif.component';
import { PositionIndicatorQualitatifComponent } from './position-indicator-qualitatif/position-indicator-qualitatif.component';

@NgModule({
  declarations: [CompanyComponent, BusinessUnitComponent, AddNewCompanyComponent, AddNewBusinessUnitComponent, CriteriaEvaluationComponent,PositionComponent, PositionListTableComponent, PositionListTreeComponent, AddNewPositionComponent,ListCategoriesComponent, PositionIndicatorQuantitatifComponent, PositionIndicatorQualitatifComponent],

  imports: [
    CommonModule,
    OrganisationManagementRoutingModule,
    TabViewModule,
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
    DropdownModule,
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
    ReactiveFormsModule,
    CardModule,
    Ng2TelInputModule,
    DragDropModule,
    NgSelectModule,
    NbStepperModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    AutoCompleteModule,
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
