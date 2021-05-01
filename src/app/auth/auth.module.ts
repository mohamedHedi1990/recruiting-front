import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbIconModule, NbInputModule } from '@nebular/theme';

import { NgxLoginComponent } from './login/login.component'; // <---
import { NbThemeModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { NgxRegisterComponent } from './register/register.component';
import { CondidatComponent } from './register/condidat/condidat.component';
import { StagiaireComponent } from './register/stagiaire/stagiaire.component';
import { SectionunComponent } from './register/sectionun/sectionun.component';
import { SectiondeuxComponent } from './register/sectiondeux/sectiondeux.component';
import { SectiontroisComponent } from './register/sectiontrois/sectiontrois.component';
import { SectionquatreComponent } from './register/sectionquatre/sectionquatre.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbIconModule,
    NbThemeModule,
    NbLayoutModule,
    NbSidebarModule,

  ],
  declarations: [
    NgxLoginComponent,
    NgxRegisterComponent,
    CondidatComponent,
    StagiaireComponent,
    SectionunComponent,
    SectiondeuxComponent,
    SectiontroisComponent,
    SectionquatreComponent, // <---
  ],
  exports:[CondidatComponent]
})
export class NgxAuthModule {
}
