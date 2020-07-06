import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'app/services/statistics/statistics.service';

@Component({
  selector: 'dashboard-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class DashboardIndexComponent implements OnInit {

  public statistics: any = {};

  constructor(
    private statisticsService: StatisticsService,
  ) { }

  ngOnInit() {
    this.getStatistics();
  }

  private getStatistics(){
    this.statisticsService.fetch().subscribe(response => {
      this.statistics = response;
      console.log(this.statistics)
    });
  }

}
