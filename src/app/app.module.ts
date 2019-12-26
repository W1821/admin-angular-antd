import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import zh from '@angular/common/locales/zh';

import {NZ_I18N, zh_CN} from 'ng-zorro-antd';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MainModule} from './pages/main/main.module';
import {LoginModule} from './pages/login/login.module';
import {FormsModule} from '@angular/forms';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    LoginModule,
    MainModule,

    // 顺序很重要，这个路由需要放在最后
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    {provide: NZ_I18N, useValue: zh_CN},
    {provide: LocationStrategy, useClass: HashLocationStrategy}, /* 在根节点后面加一个#锚点,刷新不会404 */
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
