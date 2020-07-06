import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {
  constructor(private http: HttpClient) {}

  public fetchList(params={}) {
    return this.http.get(environment.apiURL + '/drugstore/rewards', {
      params: Object.assign({}, params)
    });
  }

  public fetchFilterData(params={}) {
    return this.http.get(environment.apiURL + '/drugstore/rewards/filter_data', {
      params: Object.assign({}, params)
    });
  }

  public validate(code) {
    return this.http.post(
      environment.apiURL + '/drugstore/rewards/validate',
      { code: code }
    );
  }

  public redeem(id) {
    return this.http.post(environment.apiURL + `/drugstore/rewards/${id}/redeem`, {});
  }
}
