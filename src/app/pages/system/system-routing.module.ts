import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MenuListComponent} from './menu/list/menu-list.component';
import {UserListComponent} from './user/list/user-list.component';
import {RoleListComponent} from './role/list/role-list.component';


const routes: Routes = [
  {path: 'system/menu/list', component: MenuListComponent},
  {path: 'system/user/list', component: UserListComponent},
  {path: 'system/role/list', component: RoleListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
