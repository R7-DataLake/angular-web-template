import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NgZorroModule } from '../../../ng-zorro.module';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule
  ]
})
export class MainModule { }
