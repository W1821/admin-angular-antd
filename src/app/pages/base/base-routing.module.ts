import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WelcomeComponent} from './welcome/welcome.component';
import {ErrorComponent} from './error/error.component';
import {EmptyComponent} from './empty/empty.component';

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'error/:status', component: ErrorComponent},
  {path: '', component: EmptyComponent},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {
}
