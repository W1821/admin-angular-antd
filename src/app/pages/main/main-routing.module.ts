import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from './auth.guard';

import {MainComponent} from './component/main.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivateChild: [AuthGuard],    // 路由守护
    loadChildren: () => import('./main.children.module').then(mod => mod.MainChildrenModule), // 预加载
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
