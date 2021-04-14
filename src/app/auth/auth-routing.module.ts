import {  NgxRegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgxLoginComponent } from './login/login.component'; // <---

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: NgxLoginComponent,
      },
      {
        path: 'register',
        component: NgxRegisterComponent,
      },

    ],
  },
  {
    path: '',
    redirectTo: 'auth/login'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
