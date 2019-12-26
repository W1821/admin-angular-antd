import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  NzButtonModule,
  NzCardModule,
  NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzLayoutModule,
  NzModalModule,
  NzTabsModule,
  NzUploadModule
} from 'ng-zorro-antd';
// 图片裁剪上传
import {AngularCropperjsModule} from 'angular-cropperjs';
import {ImgCropperComponent} from './img-cropper/img.cropper.component';
// 编辑弹窗统一样式
import {EditModalComponent} from './edit-modal/edit-modal.component';
// 列表页面统一格式
import {SearchFormComponent} from './search-form/search-form.component';

/**
 * 共享组件库
 */
@NgModule({
  declarations: [
    ImgCropperComponent,
    EditModalComponent,
    SearchFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    AngularCropperjsModule,

    NzButtonModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzLayoutModule,
    NzModalModule,
    NzUploadModule,
    NzGridModule,
    NzCardModule,
  ],
  exports: [
    ImgCropperComponent,
    EditModalComponent,
    SearchFormComponent,
  ]
})
export class ShareModule {
}
