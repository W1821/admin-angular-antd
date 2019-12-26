import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  NzAvatarModule,
  NzButtonModule,
  NzCardModule,
  NzDividerModule,
  NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzLayoutModule,
  NzModalModule,
  NzPopconfirmModule,
  NzRadioModule,
  NzSelectModule,
  NzTableModule,
  NzTabsModule,
  NzTagModule,
  NzToolTipModule,
  NzTreeSelectModule
} from 'ng-zorro-antd';

import {ShareModule} from '../../components/share.module';

import {MenuListComponent} from './menu/list/menu-list.component';
import {MenuEditComponent} from './menu/edit/menu-edit.component';
import {MenuButtonModalComponent} from './menu/edit/menu-button-modal.component';
import {MenuIconModalComponent} from './menu/edit/menu-icon-modal.component';
import {MenuService} from './menu/menu.service';

import {UserListComponent} from './user/list/user-list.component';
import {UserEditComponent} from './user/edit/user-edit.component';
import {UserService} from './user/user.service';

import {RoleListComponent} from './role/list/role-list.component';
import {RoleEditComponent} from './role/edit/role-edit.component';
import {RoleService} from './role/role.service';
// system模块
import {SystemRoutingModule} from './system-routing.module';

@NgModule({
  declarations: [
    MenuListComponent,
    MenuEditComponent,
    MenuButtonModalComponent,
    MenuIconModalComponent,

    UserListComponent,
    UserEditComponent,

    RoleListComponent,
    RoleEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    NzAvatarModule,
    NzButtonModule,
    NzDividerModule,
    NzFormModule, NzGridModule,
    NzIconModule,
    NzInputModule,
    NzLayoutModule,
    NzModalModule,
    NzPopconfirmModule,
    NzRadioModule,
    NzSelectModule,
    NzTableModule,
    NzTabsModule,
    NzTagModule,
    NzToolTipModule,
    NzTreeSelectModule,

    ShareModule,

    SystemRoutingModule, NzCardModule,
  ],
  providers: [
    MenuService,
    UserService,
    RoleService,
  ]
})
export class SystemModule {
}
