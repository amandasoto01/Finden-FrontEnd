import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

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
  ],
})
export class PagesModule {
}
