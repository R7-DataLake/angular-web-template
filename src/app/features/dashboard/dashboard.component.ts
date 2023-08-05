import { Component, OnInit } from '@angular/core';
import { ECharts, EChartsOption } from 'echarts';
import * as _ from 'lodash';
import { DateTime } from 'luxon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tabIndex = 0;
  companyId: any = '';

  loading = false;

  // main
  datasets: any = [];
  query: any = '';
  total = 0;
  pageSize = 20;
  pageIndex = 1;
  offset = 0;

  service_date: any = DateTime.now().toJSDate();

  constructor (
    private message: NzMessageService,
    private router: Router,
  ) { }

  ngOnInit() { }

  onBack(): void { }

  onTabChange(event: any) {
    this.tabIndex = event;
    if (event === 0) {
      // Tab 0
    } else if (event === 1) {
      // Tab 1
    } else {
      // Default tab
    }
  }

}
