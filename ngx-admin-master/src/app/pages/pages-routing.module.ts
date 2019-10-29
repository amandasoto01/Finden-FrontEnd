import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { UploadPlaneComponent } from './upload-plane/uploadPlane.component';
import { CreateUserComponent } from './create-user/createUser.component';
import { FindPortComponent } from './find-port/findPort.component';
import { AddBuildingComponent } from './add-building/addBuilding.component';
import { ManageAccountComponent } from './manage-account/manageAccount.component';
import { AddPortComponent } from './add-port/addPort.component';
import { ApprovePlaneComponent } from './approve-plane/approvePlane.component';
import { PlaneStateComponent } from './plane-state/planeState.component';
import { ModifyAccountComponent } from './modify-account/modifyAccount.component';

import { AuthGuard } from "../security/guard";


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: '/auth/login',
      pathMatch: 'full',
    },
    {
      path:'uploadplane',
      component: UploadPlaneComponent,
      canActivate: [AuthGuard],
      data: {
        roles: ['DTI', 'Contratista', 'Mesa de Servicios']
      }
    },
    {
      path:'createuser',
      component: CreateUserComponent,
      canActivate: [AuthGuard],
      data: {
        roles: ['DTI']
      }
    },
    {
      path: 'findport',
      component: FindPortComponent,
      canActivate: [AuthGuard],
      data: {
        roles: ['DTI', 'Mesa de Servicios']
      }
    },
    {
      path: 'addbuilding',
      component: AddBuildingComponent,
      canActivate: [AuthGuard],
      data: {
        roles: ['DTI', 'Contratista']
      }
    },
    {
      path: 'manageaccount',
      component: ManageAccountComponent,
      canActivate: [AuthGuard],
      data: {
        roles: ['DTI']
      }
    },
    {
      path: 'addport',
      component: AddPortComponent,
      canActivate: [AuthGuard],
      data: {
        roles: ['DTI']
      }
    },{
      path: 'approveplane',
      component: ApprovePlaneComponent,
      canActivate: [AuthGuard],
      data:{
        roles: ['DTI']
      }
    },{
      path: 'planestate',
      component: PlaneStateComponent,
      canActivate: [AuthGuard],
      data:{
        roles: ['Contratista']
      }
    },{
      path: 'modifyaccount',
      component: ModifyAccountComponent,
      canActivate: [AuthGuard],
      data:{
        roles: ['DTI']
      }
      
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
