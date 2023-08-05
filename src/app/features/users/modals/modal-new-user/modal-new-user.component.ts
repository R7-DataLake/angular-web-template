
import { NzMessageService } from 'ng-zorro-antd/message';

import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { ICreateUser, IUpdateUser } from '../../../../core/model/user';
import { RandomstringService } from '../../../../core/services/randomstring.service';
import { UserService } from '../../services/user.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-modal-new-user',
  templateUrl: './modal-new-user.component.html',
  styleUrls: ['./modal-new-user.component.css']
})
export class ModalNewUserComponent {

  validateForm!: UntypedFormGroup;

  @Output() onSubmit = new EventEmitter<any>();

  isOkLoading = false;
  isVisible = false;
  userId: any = null;

  constructor (
    private randomString: RandomstringService,
    private userService: UserService,
    private message: NzMessageService,
    private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      enabled: [true],
      isAdmin: [false]
    });
  }

  showModal(id: any = ''): void {
    this.validateForm.reset()
    this.validateForm.controls['username'].enable()
    this.validateForm.controls['password'].enable()

    this.isVisible = true
    this.userId = null;

    // this.getMainOperators();

    if (id) {
      this.userId = id
      this.getUserInfo(id)
    }

  }

  handleOk(): void {
    if (this.validateForm.valid) {
      if (this.userId) {
        let user: IUpdateUser = {
          firstName: this.validateForm.value.firstName,
          lastName: this.validateForm.value.lastName,
          role: this.validateForm.value.isAdmin ? 'ADMIN' : 'USER',
          enabled: this.validateForm.value.enabled ? 'Y' : 'N'
        }

        this.doUpdate(user)

      } else {
        let user: ICreateUser = {
          username: this.validateForm.value.username,
          password: this.validateForm.value.password,
          firstName: this.validateForm.value.firstName,
          lastName: this.validateForm.value.lastName,
          role: this.validateForm.value.is_admin ? 'ADMIN' : 'USER',
          enabled: this.validateForm.value.enabled ? 'Y' : 'N'
        }

        this.doRegister(user)

      }
      return
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty()
          control.updateValueAndValidity({ onlySelf: true })
        }
      });
      return
    }
  }

  handleCancel(): void {
    this.isOkLoading = false;
    this.onSubmit.emit(false);
    this.isVisible = false;
  }

  async doRegister(user: ICreateUser) {
    this.isOkLoading = true
    const messageId = this.message.loading('กำลังบันทึกข้อมูล...').messageId
    try {
      await this.userService.save(user)
      this.message.remove(messageId)
      this.isOkLoading = false
      this.isVisible = false
      this.onSubmit.emit(true)
    } catch (error: any) {
      this.isOkLoading = false
      this.message.remove(messageId)
      this.message.error(`${error.code} - ${error.message}`)
    }
  }

  async doUpdate(user: IUpdateUser) {
    this.isOkLoading = true
    const messageId = this.message.loading('กำลังบันทึกข้อมูล...', { nzDuration: 0 }).messageId
    try {
      await this.userService.update(this.userId, user)
      this.message.remove(messageId)
      this.isOkLoading = false
      this.isVisible = false
      this.onSubmit.emit(true);
    } catch (error: any) {
      this.isOkLoading = false
      this.message.remove(messageId);
      this.message.error(`${error.code} - ${error.message}`);
    }
  }

  randomPassword() {
    const randomPassword = this.randomString.generateRandomString();
    this.validateForm.patchValue({ password: randomPassword });
  }

  onChangeMainOperator(event: any) {
    // this.getOperators(event);
  }

  async getUserInfo(id: any) {
    const messageId = this.message.loading('Loading...').messageId;
    try {
      const response: any = await this.userService.info(id);
      const user = response.data;

      this.validateForm.patchValue({
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        isAdmin: _.includes(user.role, 'ADMIN') ? true : false,
        enabled: user.enabled,
      })

      // this.getOperators(user.main_operator_id)
      // patch value
      this.validateForm.patchValue({
        hospcode: user.hospcode,
      })

      this.validateForm.controls['username'].disable()
      this.validateForm.controls['password'].disable()

      this.message.remove(messageId)
    } catch (error: any) {
      this.message.remove(messageId);
      this.message.error(`${error.code} - ${error.message}`);
    }
  }

}
