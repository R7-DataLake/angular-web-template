import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserMainRoutingModule } from './user-main-routing.module';
import { UserMainComponent } from './user-main.component';
import { ModalChangePasswordComponent } from '../modals/modal-change-password/modal-change-password.component';
import { ModalNewUserComponent } from '../modals/modal-new-user/modal-new-user.component';
import { NgZorroModule } from '../../../ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserMainComponent,
    ModalNewUserComponent,
    ModalChangePasswordComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule,
    UserMainRoutingModule
  ]
})
export class UserMainModule { }
