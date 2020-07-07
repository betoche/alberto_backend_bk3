import { Component, OnInit, AfterContentInit } from '@angular/core';
import { OrdersService } from 'app/services/orders/orders.service';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { DatatableBaseComponent } from 'app/shared/components/datatable.base.component';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { OrderModel } from 'app/shared/models/drugstore/order.model';
import { DialogService } from 'app/shared/services/dialog.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { UserSession } from 'app/shared/services/user-session';

@Component({
  selector: 'order-detail',
  animations: egretAnimations,
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  private orderId: number;
  public order: any={};
  public currentUser: any={};
  public orderItems: any=[];

  constructor(
    private ordersService: OrdersService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.currentUser = UserSession.getCurrentUser();
  }

  ngOnInit() {
    this.orderId = this.route.snapshot.params.id;
    this.fetchOrder()
  }

  public updateStatus(event) {
    this.ordersService.updateStatus(this.orderId, event).subscribe((response) => {
      this.order = new OrderModel(response['data']['attributes'])
    })
  }

  public ordersLink(order) {
    if (order.order_status_code == 'ready_to_be_taken') {
      return '/dashboard/orders/requests'
    } else if (order.order_status_code == 'in_process' || order.order_status_code == 'dispatched') {
      return '/dashboard/orders/in_transit'
    } else if (order.order_status_code == 'canceled' || order.order_status_code == 'completed') {
      return '/dashboard/orders/record'
    }
  }

  public tabTitle(order) {
    if (order.order_status_code == 'ready_to_be_taken') {
      return this.translate.instant('REQUESTS')
    } else if (order.order_status_code == 'in_process' || order.order_status_code == 'dispatched') {
      return this.translate.instant('IN_TRANSIT')
    } else if (order.order_status_code == 'canceled' || order.order_status_code == 'completed') {
      return this.translate.instant('HISTORIES')
    }
  }

  public statusIcon(order) {
    if (order.order_status_code == 'dispatched') {
      return 'directions_bike_24px'
    } else if (order.order_status_code == 'in_process') {
      return 'local_pharmacy_24px'
    }
  }

  private fetchOrder() {
    this.ordersService.fetch(this.orderId).subscribe((response) => {
      this.order = new OrderModel(response['data']['attributes'])
      this.orderItems = this.order.order_items
    })
  }

}
