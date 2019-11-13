import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import {
  NbAuthComponent,
} from '@nebular/auth';

import { LoginComponent } from './pages/login/login.component';
import { ChangePasswordComponent } from './pages/change-password/changePassword.component';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },{
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },{
        path: 'changepassword',
        component: ChangePasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
