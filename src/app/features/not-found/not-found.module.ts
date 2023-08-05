import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';
import { NgZorroModule } from '../../ng-zorro.module';


@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    NotFoundRoutingModule
  ]
})
export class NotFoundModule { }
