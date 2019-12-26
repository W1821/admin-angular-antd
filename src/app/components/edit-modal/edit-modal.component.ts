import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NotificationService} from '../../common/service/notification.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent {

  // 保存回调方法
  @Input() saveCallback: any;

  // 表单
  @Input()
  formGroup: FormGroup;

  // 显示弹窗
  @Input()
  showModal: boolean;

  @Output()
  showModalChange = new EventEmitter<boolean>();

  isLoading = false;

  // 打开modal后的回调方法
  @Input() afterOpen: any = () => {
  };

  // 关闭modal后回调方法
  @Input() afterClose = () => {
  };

  constructor(private noticeService: NotificationService) {
  }

  /**
   * 关闭弹窗
   */
  clickClose(): void {
    this.showModal = !this.showModal;
    this.showModalChange.emit(this.showModal);
    // 重置表单
    this.formGroup.reset();
    this.afterClose();
  }

  /**
   * 点击确认按钮
   */
  clickOk(): void {
    if (this.isLoading) {
      return;
    }
    console.log('EditModalComponent->clickOk');
    // 先验证
    for (const i of Object.keys(this.formGroup.controls)) {
      this.formGroup.controls[i].markAsDirty();
      this.formGroup.controls[i].updateValueAndValidity();
    }
    if (!this.formGroup.valid) {
      return;
    }
    // 开始转圈
    this.isLoading = true;
    // 调用回调方法
    this.saveCallback().then((success) => {
      // 取消转圈
      this.isLoading = false;
      if (success) {
        this.noticeService.success('保存成功');
        this.clickClose();
      }
    });
  }

}
