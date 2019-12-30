import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NzIconModule, NzModalModule, NzResultModule, NzUploadModule} from 'ng-zorro-antd';
import {AngularCropperjsModule} from 'angular-cropperjs';

import {WelcomeComponent} from './welcome/welcome.component';
import {ErrorComponent} from './error/error.component';
// base模块
import {BaseRoutingModule} from './base-routing.module';


@NgModule({
  declarations: [
    WelcomeComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    AngularCropperjsModule,

    NzIconModule,
    NzModalModule,
    NzResultModule,
    NzUploadModule,

    BaseRoutingModule,
  ],
  exports: [
    ErrorComponent
  ]
})
export class BaseModule {
}
