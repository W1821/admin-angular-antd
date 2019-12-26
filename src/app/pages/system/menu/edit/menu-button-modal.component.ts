import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Button} from '../menu.model';

@Component({
  selector: 'app-menu-button-modal',
  templateUrl: './menu-button-modal.component.html',
  styleUrls: ['./menu-button-modal.component.css']
})
export class MenuButtonModalComponent implements OnInit {

  buttonType: any;

  showModal;

  @Output() buttonBack = new EventEmitter<object>();

  index: number = null;
  id: number = null;

  validateForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      buttonName: [null, [Validators.required]],
      code: [null, [Validators.required]],
      actions: [null],
    });
  }

  openModal = (index, button: Button) => {
    // 修改按钮
    if (button) {
      this.index = index;
      this.id = button.id;
      this.validateForm.setValue({
        buttonName: button.buttonName,
        code: button.code,
        actions: button.actions,
      });
      this.buttonType = button.code + '-' + button.buttonName;
    }
    this.showModal = true;
  };

  handleOk(): void {
    // 先验证
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (!this.validateForm.valid) {
      return;
    }
    // 返回编辑的按钮
    const value = {
      index: this.index,
      button: {id: this.id, ...this.validateForm.value},
    };
    this.buttonBack.emit(value);
    this.handleCancel();
  }

  handleCancel(): void {
    this.showModal = false;
    // 清空表单
    this.validateForm.reset();
    this.index = null;
    this.id = null;
  }

  changeButtonType(event) {
    const button = event.split('-');
    this.validateForm.setValue({
      buttonName: button[1],
      code: button[0],
      actions: this.validateForm.get('actions').value,
    });
  }

}
