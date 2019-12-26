import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  // 默认登录页面
  {path: '', component: LoginComponent},
  // 重定向到登录页面
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
