import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatChipsModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTabsModule,
  MatSelectModule,
  MatInputModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { SharedModule } from 'app/shared/shared.module';
import { DashboardRoutes } from './dashboard.routing';
import { TranslateModule } from '@ngx-translate/core';

import { DashboardIndexComponent } from './index/index.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from 'app/modules/dashboard/order-detail/order-detail.component';
import { EditProfileComponent } from 'app/shared/modules/dashboard/edit-profile/edit-profile.component';
import { ProfileComponent } from 'app/shared/modules/dashboard/profile/profile.component';

import { DialogService } from 'app/shared/services/dialog.service';
import { RewardsComponent } from './rewards/rewards.component';
import { RedemptionComponent } from './rewards/redemption/redemption.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule,
    MatProgressBarModule,
    FlexLayoutModule,
    NgxDatatableModule,
    ChartsModule,
    FileUploadModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule,
    TranslateModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [
    DashboardIndexComponent, EditProfileComponent, ProfileComponent,
    OrdersComponent, OrderDetailComponent, RewardsComponent, RedemptionComponent
  ],
  entryComponents: [],
  exports: [ReactiveFormsModule],
  providers: [DialogService]
})
export class DashboardModule {}
