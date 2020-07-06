import { Component, OnInit, AfterContentInit } from '@angular/core';
import * as _ from 'lodash';

import { RewardsService } from 'app/services/rewards/rewards.service';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import { DatatableBaseComponent } from 'app/shared/components/datatable.base.component';

import { ActivatedRoute, Router } from '@angular/router';
import { RewardModel } from 'app/shared/models/reward/reward.model';

import { DialogService } from 'app/shared/services/dialog.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-rewards',
  animations: egretAnimations,
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent extends DatatableBaseComponent implements OnInit, AfterContentInit {
  public rewards: any = [];
  public pageLimit: 10;

  public pharmaceuticalCompanyID: string;
  public medicationId: string;
  public redemptionDate: string;

  public pharmaceuticalCompaniesList: any = [];
  public medicationsList: any = [];

  constructor(
    private rewardsService: RewardsService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
  }


  public filter() {
    let params = {
      redemption_date: this.redemptionDate || "",
      medication_id: this.medicationId || "",
      pharmaceutical_company_id: this.pharmaceuticalCompanyID || ""
    }

    this.getRewards(params);
  }

  private loadFilterData() {
    this.rewardsService.fetchFilterData().subscribe(
      response => {
        this.pharmaceuticalCompaniesList = response['pharmaceutical_companies']
        this.medicationsList = response['medications']
      },
      _error => {
        this.pharmaceuticalCompaniesList = [];
        this.medicationsList = [];
      }
    );
  }

  ngAfterContentInit() {
    this.loadFilterData();
    this.getRewards();
  }

  public getRewards(params = {}) {
    this.rewardsService.fetchList(params).subscribe(
      response => {
        this.rewards = RewardModel.buildFrom(_.map(response['data'], 'attributes'));
      },
      _error => {
        this.rewards = [];
      }
    );
  }
}
