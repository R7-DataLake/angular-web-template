import { NzMessageService } from 'ng-zorro-antd/message';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  jwtHelper: JwtHelperService = new JwtHelperService();

  public validateForm!: FormGroup;
  public passwordVisible: Boolean = false;

  constructor (
    public login: FormBuilder,
    private loginService: LoginService,
    private message: NzMessageService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.validateForm = this.login.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    });
  }

  async onSubmit() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.status == 'INVALID') {
      this.message.create('warning', 'กรุณาตรวจสอบข้อมูลให้ถูกต้อง');
      return;
    }

    if (this.validateForm.status == 'VALID') {
      let { username, password } = this.validateForm.value;

      const messageId = this.message.loading('Loading...', { nzDuration: 0 }).messageId;
      try {
        const response: any = await this.loginService.login(username, password);
        this.message.remove(messageId);
        if (response.data) {
          const token = response.data.accessToken;
          sessionStorage.setItem('token', token);

          this.message.create('success', 'เข้าสู่ระบบสำเร็จ');

          const decoded: any = this.jwtHelper.decodeToken(token);
          const isAdmin = decoded.role.includes('ADMIN');
          isAdmin ? this.router.navigate(['/users']) : this.router.navigate(['/dashboard']);

          return;
        } else {
          this.message.create('error', 'ชื่อผู้ใช้งาน/รหัสผ่าน ไม่ถูกต้อง');
        }
      } catch (error: any) {
        this.message.remove(messageId);
        this.message.error(`${error.code} - ${error.message}`);
      }
    }
  }

}
