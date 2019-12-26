import {NgModule} from '@angular/core';

import {SystemModule} from '../system/system.module';
import {DemoModule} from '../demo/demo.module';
import {BaseModule} from '../base/base.module';

@NgModule({
  imports: [
    SystemModule,
    DemoModule,

    // 此Module要放在最后
    BaseModule,
  ],
})
export class MainChildrenModule {
}
