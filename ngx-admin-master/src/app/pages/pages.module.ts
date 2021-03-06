import { NgModule } from '@angular/core';
import { NbMenuModule, NbAlertModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { UploadPlaneComponent } from './upload-plane/uploadPlane.component';
import { CreateUserComponent } from './create-user/createUser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FindPortComponent } from './find-port/findPort.component';
import { AddBuildingComponent } from './add-building/addBuilding.component';
import { AddWiringCenterComponent } from './add-wiring-center/addWiringCenter.component';
import { ManageAccountComponent } from './manage-account/manageAccount.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AddPortComponent } from './add-port/addPort.component';
import { ApprovePlaneComponent } from './approve-plane/approvePlane.component';
import { PlaneStateComponent } from './plane-state/planeState.component';
import { ModifyAccountComponent } from './modify-account/modifyAccount.component';
import { PlaneHistoryComponent } from './plane-history/planeHistory.component';
import { PlaneSwitchComponent } from './plane-switches/planeSwitch.component';
import { HomeDtiComponent } from './home-dti/homeDti.component';
import { ModifyPortComponent } from './modify-port/modifyPort.component';
import { HomeMesaServiciosComponent } from './home-mesa-servicios/homeMesaServicios.component';


import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,

} from '@nebular/theme';
import { DownloadButtonComponent } from './download-button/downloadButton.component';
import { ModifyUserButtonComponent } from './modify-user-button/modifyUserButton.component';
import { ApprovePlaneButtonComponent } from "./approve-plane-button/approvePlaneButton.component";
import { HomeContratistaComponent } from './home-contratista/homeContratista.component';

/**
 * En este modulo se definen e instancian los componentes que se pueden ver cuando un usuario esta logueado al sistema
 * Las rutas de cada componente estan definidas en el archivo pages-routing.module.ts
 * Adicionalmente, aqui se definen los servicios y modulos adicionales que son importados para el uso en la pagina.
 */

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    Ng2SmartTableModule,
    NbAlertModule,
  ],
  declarations: [
    PagesComponent,
    UploadPlaneComponent,
    CreateUserComponent,
    FindPortComponent,
    AddBuildingComponent,
    AddWiringCenterComponent,
    ManageAccountComponent,
    AddPortComponent,
    ApprovePlaneComponent,
    PlaneStateComponent,
    ModifyAccountComponent,
    PlaneHistoryComponent,
    PlaneSwitchComponent,
    HomeDtiComponent,
    DownloadButtonComponent,
    ModifyUserButtonComponent,
    ApprovePlaneButtonComponent,
    ModifyPortComponent,
    HomeContratistaComponent,
    HomeMesaServiciosComponent,
  ],
  entryComponents:[
    DownloadButtonComponent,
    ModifyUserButtonComponent,
    ApprovePlaneButtonComponent,
  ]
})
export class PagesModule {
}
