import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MainService} from '../main.service';
import {NotificationService} from '../../../common/service/notification.service';

@Component({
  selector: 'app-modify-pwd-modal',
  templateUrl: './modify-pwd-modal.component.html',
  styleUrls: ['./modify-pwd-modal.component.css']
})
export class ModifyPwdModalComponent implements OnInit {

  @Input()
  showModifyPwdModal;

  @Output()
  showModifyPwdModalChange = new EventEmitter<boolean>();

  isModifyPwdLoading = false;

  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private noticeService: NotificationService,
    private mainService: MainService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      oldPwd: [null, [Validators.required]],
      newPwd: [null, [Validators.required]],
      verifiedPwd: [null, [Validators.required]],
    });
  }

  handleModifyPwdOk = (): void => {
    // 先验证
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (!this.validateForm.valid) {
      return;
    }
    this.modifyPwd();
  };

  handleModifyPwdCancel = (): void => {
    this.showModifyPwdModal = !this.showModifyPwdModal;
    this.showModifyPwdModalChange.emit(this.showModifyPwdModal);
    // 清空表单
    this.validateForm.reset();
  };

  /**
   * 执行http请求，修改密码
   */
  modifyPwd = (): void => {
    // 设置转圈
    this.isModifyPwdLoading = true;
    // 发送请求
    this.mainService.modifyPwd(this.validateForm.value).then(this.onSuccess);
  };

  /**
   * 修改密码请求成功后的处理逻辑
   */
  private onSuccess = (response): void => {
    this.isModifyPwdLoading = false;
    // 修改成功
    if (response.success) {
      this.noticeService.success('修改密码成功！');
      this.handleModifyPwdCancel();
    } else {
      this.noticeService.error(response.msg);
    }
  };

}
