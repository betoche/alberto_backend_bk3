import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  public fetchList(orderType, params={}) {
    return this.http.get(environment.apiURL + '/drugstore/orders', {
      params: Object.assign({
        order_type: orderType
      }, params)
    });
  }

  public fetch(id) {
    return this.http.get(environment.apiURL + `/drugstore/orders/${id}`, {});
  }

  public updateStatus(id, event) {
    return this.http.post(environment.apiURL + `/drugstore/orders/${id}/update_status`, {
      event: event
    });
  }
}
