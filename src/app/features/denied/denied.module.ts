import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeniedRoutingModule } from './denied-routing.module';
import { DeniedComponent } from './denied.component';
import { NgZorroModule } from '../../ng-zorro.module';


@NgModule({
  declarations: [
    DeniedComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    DeniedRoutingModule
  ]
})
export class DeniedModule { }
