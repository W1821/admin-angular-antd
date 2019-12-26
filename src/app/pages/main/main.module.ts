import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {
  NzAvatarModule,
  NzBreadCrumbModule,
  NzButtonModule,
  NzDropDownModule,
  NzFormModule,
  NzIconModule,
  NzInputModule,
  NzLayoutModule,
  NzMenuModule,
  NzModalModule
} from 'ng-zorro-antd';

import {MainComponent} from './component/main.component';
import {ModifyPwdModalComponent} from './component/modify-pwd-modal.component';

import {MainRoutingModule} from './main-routing.module';

import {MainService} from './main.service';
import {AuthGuard} from './auth.guard';
import {ButtonAuthService} from './button-auth.service';
import {MenuService} from '../system/menu/menu.service';

@NgModule({
  declarations: [
    MainComponent,
    ModifyPwdModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NzAvatarModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzDropDownModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzLayoutModule,
    NzMenuModule,
    NzModalModule,

    MainRoutingModule,
  ],
  providers: [
    MainService,
    MenuService,
    AuthGuard,
    ButtonAuthService,
  ]
})
export class MainModule {
}
