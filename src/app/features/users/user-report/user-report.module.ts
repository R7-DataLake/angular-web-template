import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserReportRoutingModule } from './user-report-routing.module';
import { UserReportComponent } from './user-report.component';
import { NgZorroModule } from '../../../ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserReportComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule,
    UserReportRoutingModule
  ]
})
export class UserReportModule { }
