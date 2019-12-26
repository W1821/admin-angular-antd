import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {
  NzAlertModule,
  NzButtonModule,
  NzCheckboxModule,
  NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzLayoutModule,
  NzNotificationModule,
  NzSpinModule
} from 'ng-zorro-antd';

import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {CommonModule} from '@angular/common';
import {LoginService} from './login.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NzAlertModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzLayoutModule,
    NzNotificationModule,
    NzSpinModule,

    LoginRoutingModule,
  ],
  providers: [
    LoginService,
  ]
})
export class LoginModule {
}
