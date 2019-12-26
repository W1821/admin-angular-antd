import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ImageUploadComponent} from './image/image-upload.component';

const routes: Routes = [
  {path: 'demo/upload-img', component: ImageUploadComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule {
}
