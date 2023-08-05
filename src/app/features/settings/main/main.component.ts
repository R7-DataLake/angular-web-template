import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SettingService } from '../services/setting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  validateForm: UntypedFormGroup;
  loading = false;

  constructor (
    private fb: UntypedFormBuilder,
    private router: Router,
    private message: NzMessageService,
    private settingService: SettingService
  ) {

    this.validateForm = this.fb.group({
      hospcode: ['', [Validators.required]],
      hospname: ['', [Validators.required]],
      lineNotifyToken: ['', [Validators.required]],
      lineSecretToken: ['', [Validators.required]]
    });

  }

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }

  ngOnInit() {
    this.getInfo();
  }

  async getInfo() {
    const messageId = this.message.loading('Loading...').messageId;
    try {
      const response: any = await this.settingService.getSettingInfo();
      this.message.remove(messageId);
      const info = response.data;

      if (!info) {
        this.message.warning('ไม่พบข้อมูลการตั้งค่า');
        return;
      }

      this.validateForm.patchValue({
        hospcode: info.hospcode,
        hospname: info.hospname,
        lineSecretToken: info.line_secret_token,
        lineNotifyToken: info.line_notify_token,
      });

      this.validateForm.controls['hospcode'].disable();
      this.validateForm.controls['hospname'].disable();

    } catch (error) {
      this.message.remove(messageId);
      this.message.error('ไม่สามารถแสดงข้อมูลการตั้งค่าได้');
      console.log(error);
    }
  }

  onBack(): void {
    this.router.navigate(['/dashboard'])
  }

  async save() {
    const messageId = this.message.loading('บันทึกข้อมูล...').messageId;
    try {
      if (!this.validateForm.valid) {
        this.message.warning('กรุณาระบุข้อมูลให้ครบถ้วน');
        this.message.remove(messageId);
        return;
      }

      const { lineNotifyToken, lineSecretToken } = this.validateForm.value;
      await this.settingService.saveInfo(lineNotifyToken, lineSecretToken);
      this.message.remove(messageId);
      this.message.success('บันทึกข้อมูลเรียบร้อย');
    } catch (error) {
      this.message.remove(messageId);
      this.message.error('ไม่สามารถบันทึกข้อมูลได้');
      console.log(error);
    }
  }
}
