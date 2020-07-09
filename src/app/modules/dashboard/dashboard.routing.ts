import { Routes } from '@angular/router';

import { DashboardIndexComponent } from './index/index.component';
import { EditProfileComponent } from 'app/modules/dashboard/edit-profile/edit-profile.component';
import { OrdersComponent } from 'app/modules/dashboard/orders/orders.component';
import { OrderDetailComponent } from 'app/modules/dashboard/order-detail/order-detail.component';
import { ProfileComponent } from 'app/shared/modules/dashboard/profile/profile.component';
import { DataImportingComponent } from 'app/shared/modules/dashboard/data-importing/data-importing.component';
import { RewardsComponent } from 'app/modules/dashboard/rewards/rewards.component';
import { RedemptionComponent } from 'app/modules/dashboard/rewards/redemption/redemption.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardIndexComponent
      },
      {
        path: 'data-importing/:type',
        component: DataImportingComponent,
        data: { title: 'IMPORT_DATA', breadcrumb: 'IMPORT_DATA' }
      },
      {
        path: 'edit_profile',
        component: EditProfileComponent,
        data: { title: 'EDIT_PROFILE', breadcrumb: 'EDIT_PROFILE' }
      },
      {
        path: 'rewards',
        children: [
          {
            path: '',
            component: RewardsComponent,
            data: { title: 'REWARDS', breadcrumb: 'REWARDS'}
          },
          {
            path: 'redemption',
            component: RedemptionComponent,
            data: { title: 'REDEMPTION_OF_REWARDS', breadcrumb: 'REDEMPTION_OF_REWARDS' }
          }
        ]
      },
      {
        path: 'orders',
        data: { title: 'ORDERS', breadcrumb: 'ORDERS' },
        children: [
          {
            path: ':type',
            component: OrdersComponent
          },
          {
            path: 'detail/:id',
            component: OrderDetailComponent,
            data: { title: 'ORDER_DETAIL', breadcrumb: 'ORDER_DETAIL' }
          }
        ]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'PROFILE', breadcrumb: 'PROFILE' },
      }
    ]
  }
];
