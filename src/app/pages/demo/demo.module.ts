import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// demo模块
import {DemoRoutingModule} from './demo-routing.module';

import {ShareModule} from '../../components/share.module';
import {ImageUploadComponent} from './image/image-upload.component';
import {NzCardModule, NzIconModule, NzStatisticModule} from 'ng-zorro-antd';


@NgModule({
  declarations: [
    ImageUploadComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,

    NzCardModule,
    NzStatisticModule,
    NzIconModule,

    DemoRoutingModule,
  ],
})
export class DemoModule {
}
