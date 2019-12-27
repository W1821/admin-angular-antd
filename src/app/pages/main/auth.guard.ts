import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';

import {LoginService} from '../login/login.service';
import {MainService} from './main.service';

import {Menu} from '../system/menu/menu.model';
import {SessionStorageService} from '../../common/service/session-storage.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  private ignoreUrls = [
    '/',
    '/main',
    '/main/welcome',
    '/main/error/403',
    '/main/error/404',
    '/main/error/500',
  ];

  constructor(
    private loginService: LoginService,
    private mainService: MainService,
    private sessionStorageService: SessionStorageService,
    private router: Router) {
  }

  // 路由守卫
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('路由守卫权限判定开始--->跳转页面路由地址--->', state.url);
    // 判断是否登录
    const isLoggedIn = this.checkLogin();

    // 未登陆，跳转登陆页面
    if (!isLoggedIn) {
      console.log('路由守卫 未登陆--->跳转登陆页面');
      this.router.navigate(['']);
      return false;
    }

    // 登陆后, F5刷新，直接通过
    const redirectUrl = this.sessionStorageService.get('redirectUrl');
    if (redirectUrl === state.url) {
      console.log('路由守卫 F5刷新--->直接通过--->', redirectUrl);
      return true;
    }

    const hasAuth = this.hasAuth(state.url);
    // 没有权限，但是登陆了
    if (!hasAuth) {
      console.log('路由守卫 已登录--->未授权页面--->跳转403页面');
      this.router.navigate(['/main/error', 403]);
      return false;
    }

    console.log('路由守卫权限判定成功--->跳转成功');
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  private checkLogin = (): boolean => {
    return this.loginService.isLoggedIn;
  };

  private hasAuth = (url: string): boolean => {
    if (this.isIgnoreUrl(url)) {
      return true;
    }
    return this.contains(this.mainService.getMenuDataList(), url);
  };

  private contains = (menus: Menu[], url: string): boolean => {
    for (const menu of menus) {
      if (url === menu.routePath) {
        return true;
      }
      const buttons = menu.buttons;
      if (!buttons) {
        continue;
      }
      for (const button of buttons) {
        if (!button.routePath) {
          continue;
        }
        const prefix = button.routePath.slice(0, button.routePath.lastIndexOf(':'));
        if (url.startsWith(prefix)) {
          return true;
        }
      }
    }
    return false;
  };

  /**
   * 判断是否是忽略的URL
   * @param url 路径
   */
  private isIgnoreUrl = (url: string): boolean => {
    for (const key in this.ignoreUrls) {
      if (this.ignoreUrls[key] === url) {
        return true;
      }
    }
    return false;
  };


}
