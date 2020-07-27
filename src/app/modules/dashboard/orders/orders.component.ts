import { Component, OnInit, AfterContentInit } from '@angular/core';
import { OrdersService } from 'app/services/orders/orders.service';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { DatatableBaseComponent } from 'app/shared/components/datatable.base.component';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

import { OrderModel } from 'app/shared/models/drugstore/order.model';
import { DialogService } from 'app/shared/services/dialog.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { UserSession } from 'app/shared/services/user-session';

@Component({
  selector: 'orders',
  animations: egretAnimations,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends DatatableBaseComponent implements OnInit, AfterContentInit {
  public rows: any = [];
  public scope: string = 'orders';
  public currentUser: any={};
  public orderType: string;
  public pageLimit: number=10;
  public months: any = [
    { name: 'Enero', value: 1 },
    { name: 'Febrero', value: 2 },
    { name: 'Marzo', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Mayo', value: 5 },
    { name: 'Junio', value: 6 },
    { name: 'Julio', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Septiembre', value: 9 },
    { name: 'Octubre', value: 10 },
    { name: 'Noviembre', value: 11 },
    { name: 'Diciembre', value: 12 },
  ]
  public years: any = []
  public month: number;
  public year: number;

  constructor(
    private ordersService: OrdersService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();

    this.years = _.rangeRight(2010, (new Date()).getFullYear() + 1);
    this.currentUser = UserSession.getCurrentUser();
  }

  ngOnInit() {
    this.orderType = this.route.snapshot.params.type;

    if (this.currentUser.role != 'drugstore_location' && this.orderType != 'record') {
      this.orderType = 'record'
      this.router.navigate([`/dashboard/orders/record`]);
    }
  }

  ngAfterContentInit() {
    this.getOrders(this.orderType);
  }

  public getOrders(orderType) {
    let params = {}

    if (!!this.month) {
      params['month'] = this.month
    }

    if (!!this.year) {
      params['year'] = this.year
    }

    this.orderType = orderType
    this.ordersService.fetchList(orderType, params).subscribe(
      response => {
        this.rows = OrderModel.buildFrom(_.map(response['data'], 'attributes'));
      },
      _error => {
        this.rows = [];
      }
    );
  }

  public onChangeMonth(selectedMonth) {
    this.getOrders(this.orderType)
  }

  public onChangeYear(selectedYear) {
    this.getOrders(this.orderType)
  }

  public takeOrder(id) {
    this.ordersService.updateStatus(id, 'take').subscribe((response) => {
      this.router.navigate([`/dashboard/orders/detail/${id}`]);
    })
  }

}
