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
import { AddWiringCenterComponent } from './add-wiring-center/addWiringCenter.component';
import { ManageAccountComponent } from './manage-account/manageAccount.component';
import { AddPortComponent } from './add-port/addPort.component';
import { ApprovePlaneComponent } from './approve-plane/approvePlane.component';
import { PlaneStateComponent } from './plane-state/planeState.component';
import { ModifyAccountComponent } from './modify-account/modifyAccount.component';
import { PlaneHistoryComponent } from './plane-history/planeHistory.component';
import { PlaneSwitchComponent } from './plane-switches/planeSwitch.component';
import { HomeDtiComponent } from './home-dti/homeDti.component';
import { ModifyPortComponent } from './modify-port/modifyPort.component';
import { HomeContratistaComponent } from './home-contratista/homeContratista.component';


import { AuthGuard } from "../security/guard";
import { HomeMesaServiciosComponent } from './home-mesa-servicios/homeMesaServicios.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
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
        roles: ['DTI', 'contratista', 'mesa de servicios']
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
        roles: ['DTI', 'mesa de servicios']
      }
    },
    {
      path: 'addbuilding',
      component: AddBuildingComponent,
      canActivate: [AuthGuard],
      data: {
        roles: ['DTI']
      }
    },
    {
      path: 'addwiringcenter',
      component: AddWiringCenterComponent,
      canActivate: [AuthGuard],
      data: {
        roles: ['DTI']
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
        roles: ['DTI', 'contratista']
      }
    },{
      path: 'planehistory',
      component: PlaneHistoryComponent,
      canActivate: [AuthGuard],
      data:{
        roles: ['DTI']
      }
    },{
      path: 'modifyaccount/:email',
      component: ModifyAccountComponent,
      canActivate: [AuthGuard],
      data:{
        roles: ['DTI', 'contratista', 'mesa de servicios']
      }
    },{
      path: 'planeswitch',
      component: PlaneSwitchComponent,
      canActivate: [AuthGuard],
      data:{
        roles: ['DTI']
      }
    },{
      path:'homedti',
      component: HomeDtiComponent,
      canActivate: [AuthGuard],
      data:{
        roles: ['DTI']
      },
    },{
      path: 'modifyport',
      component: ModifyPortComponent,
      canActivate: [AuthGuard],
      data:{
        roles: ['DTI']
      },
    },{
      path:'homecontratista',
      component: HomeContratistaComponent,
      canActivate: [AuthGuard],
      data:{
        roles: ['contratista']
      },
    },
    {
      path:'homemesadeservicios',
      component: HomeMesaServiciosComponent,
      canActivate: [AuthGuard],
      data:{
        roles: ['mesa de servicios']
      },
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
