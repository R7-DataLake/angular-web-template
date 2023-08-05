import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalChangePasswordComponent } from '../modals/modal-change-password/modal-change-password.component';
import { ModalNewUserComponent } from '../modals/modal-new-user/modal-new-user.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {

  @ViewChild(ModalNewUserComponent) private mdlNewUser!: ModalNewUserComponent;
  @ViewChild(ModalChangePasswordComponent) private mdlChangePassword!: ModalChangePasswordComponent;

  jwtHelper: JwtHelperService = new JwtHelperService();

  roleCode: any = '';
  usersDataSet: any[] = [];
  query: any = '';
  loading = false;

  total = 0;
  pageSize = 20;
  pageIndex = 1;
  offset = 0;

  userId: any = '';

  roles: any = [
    { name: 'ผู้ดูแลระบบ', code: 'ADMIN' },
    { name: 'ผู้ใช้งานทั่วไป', code: 'USER' }
  ]

  constructor (
    private router: Router,
    private userService: UserService,
    private message: NzMessageService,
    private modal: NzModalService) {
    const token: any = sessionStorage.getItem('token');
    const decoded: any = this.jwtHelper.decodeToken(token);
    this.userId = decoded.sub;
  }

  ngOnInit() {
    this.getList();
  }

  onBack(): void {
    this.router.navigate(['/dashboard'])
  }

  openEditUser(user: any) {
    const user_id = user.user_id;
    this.mdlNewUser.showModal(user_id)
  }

  openNewUserRegister() {
    this.mdlNewUser.showModal()
  }

  onSubmitRegister(event: any) {
    if (event) {
      this.getList()
    }
  }

  changePassword(user: any) {
    this.mdlChangePassword.showModal(user);
  }

  onChangeRoles(event: any) {
    this.roleCode = event;
    this.getList();
  }

  async getList() {
    const messageId = this.message.loading('Loading...').messageId;
    try {
      const _limit = this.pageSize;
      const _offset = this.offset;
      const response = await this.userService.getList(this.query, _limit, _offset);

      const data: any = response.data;

      this.total = data.total || 1

      this.usersDataSet = data.data.map((v: any) => {
        const date = v.last_login ? DateTime.fromISO(v.last_login).setLocale('th').toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS) : '';
        v.last_login = date;
        return v;
      });
      this.message.remove(messageId);
    } catch (error: any) {
      this.message.remove(messageId);
      this.message.error(`${error.code} - ${error.message}`);
    }
  }

  doSearch() {
    if (this.query) {
      this.getList();
    } else {
      this.message.warning('กรุณาระบุคำค้นหา');
    }
  }

  onPageIndexChange(pageIndex: any) {

    this.offset = pageIndex === 1 ?
      0 : (pageIndex - 1) * this.pageSize;

    this.getList()
  }

  onPageSizeChange(pageSize: any) {
    this.pageSize = pageSize
    this.pageIndex = 1

    this.offset = 0

    this.getList()
  }

  refresh() {
    this.query = '';
    this.pageIndex = 1;
    this.offset = 0;
    this.getList();
  }

  async confirmDelete(user: any) {
    if (this.userId === user.user_id) {
      return;
    }

    this.modal.confirm({
      nzTitle: 'ยืนยันยกเลิกรายการ?',
      nzContent: `ต้องการยกเลิกรายการผู้ใช้งานนี้ (${user.first_name} ${user.last_name}) ใช่หรือไม่?`,
      nzOkText: 'ใช่',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this._doDeleteUser(user.user_id),
      nzCancelText: 'ไม่ใช่',
      nzOnCancel: () => { }
    });
  }

  private async _doDeleteUser(user_id: any) {
    const messageId = this.message.loading('Loading...').messageId;
    try {
      await this.userService.delete(user_id);
      this.message.remove(messageId);
      this.message.success('ยกเลิกรายการเรียบร้อย');
      this.getList();
    } catch (error: any) {
      this.message.remove(messageId);
      this.message.error(`${error.code} - ${error.message}`);
    }
  }

}
