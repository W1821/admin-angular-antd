import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {MainService} from '../main.service';
import {LoginService} from '../../login/login.service';

import {Menu} from '../../system/menu/menu.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  showModifyPwdModal = false;

  isCollapsed = false;

  // 左边二三级菜单
  leftMenuDataArr: Menu[];

  breadcrumb = {
    rootName: null,
    leftName: null,
    subName: null,
  };

  constructor(
    public mainService: MainService,
    public loginService: LoginService,
    private router: Router) {
  }

  ngOnInit() {
    console.log('MainComponent-ngOnInit');
    this.mainService.init().then(() => this.setDefaultMenuDataArr());
  }

  logout() {
    this.loginService.logout().then(() => this.router.navigate(['login', 1]));
  }

  /**
   * 修改密码弹窗
   */
  openModifyPwdModal = (): void => {
    this.showModifyPwdModal = true;
  };

  /**
   * 头部菜单点击事件
   * @param menu 头部菜单
   */
  clickHeaderMenu = (menu: Menu): void => {
    if (!menu) {
      return;
    }
    // 选中头部菜单
    this.checkedHeaderMenu(menu);
    // 设置面包屑一级
    this.setDefaultBreadcrumb(menu);
    // 切换二级菜单
    this.leftMenuDataArr = menu.children;
  };

  /**
   * 左边二级菜单点击事件
   * @param leftMenu 二级菜单
   */
  clickLeftMenu = (leftMenu: Menu): void => {
    if (!leftMenu) {
      return;
    }
    // 设置面包屑二级
    this.breadcrumb.leftName = leftMenu.menuName;
    this.breadcrumb.subName = null;
    this.closeAllLeftMenu();
    leftMenu.isChecked = true;
  };

  /**
   * 左边三级菜单点击事件
   * @param subMenu 三级菜单
   */
  clickSubMenu = (subMenu: Menu): void => {
    if (!subMenu) {
      return;
    }
    this.breadcrumb.subName = subMenu.menuName;
    this.closeAllSubMenu();
    subMenu.isChecked = true;
    // 跳转路由
    this.router
      .navigate([subMenu.routePath])
      .then(success => {
        // 跳转成功保存当前地址
        if (success) {
          this.mainService.setRedirectUrl(subMenu.routePath);
        }
      });
  };

  /**
   * 选中头部菜单
   * @param menu 菜单
   */
  private checkedHeaderMenu = (menu: Menu): void => {
    // 取消其他头部菜单的选中状态
    this.mainService.getMenuDataTree().forEach(m => m.isChecked = false);
    // 设置当前头部菜单选中状态
    menu.isChecked = true;
  };


  /**
   * 设置默认数据
   */
  private setDefaultMenuDataArr = (): void => {

    if (this.f5Refresh()) {
      return;
    }

    // 点击默认的头部菜单
    const headerMenu = this.mainService.getMenuDataTree()[0];
    this.clickHeaderMenu(headerMenu);

    // 点击默认左边二级菜单
    const leftMenu = this.leftMenuDataArr[0];
    this.clickLeftMenu(leftMenu);

    // 点击默认左边三级菜单
    const subMenu = leftMenu.children[0];
    this.clickSubMenu(subMenu);
  };

  /**
   * 设置默认面包屑数据
   */
  private setDefaultBreadcrumb = (menu: Menu): void => {
    this.breadcrumb.rootName = menu.menuName;
    this.breadcrumb.leftName = null;
    this.breadcrumb.subName = null;
  };

  /**
   * 关闭所有的二级菜单
   */
  private closeAllLeftMenu = (): void => {
    this.leftMenuDataArr.forEach(menu => menu.isChecked = false);
  };

  private closeAllSubMenu = (): void => {
    this.leftMenuDataArr.forEach(menu => menu.children.forEach(sm => sm.isChecked = false));
  };

  /**
   * F5刷新逻辑
   */
  private f5Refresh(): boolean {
    const redirectUrl = this.mainService.getRedirectUrl();
    if (!redirectUrl) {
      return false;
    }
    console.log('MainComponent->F5刷新逻辑');

    const currentMenu = this.mainService.getMenuDataList().find(menu => menu.routePath === redirectUrl);
    if (!currentMenu) {
      return false;
    }

    const headerMenuId = currentMenu.pids.split(',')[0];
    const headerMenu = this.mainService.getMenuDataTree().find(menu => menu.id + '' === headerMenuId);
    if (!headerMenu) {
      return false;
    }
    this.clickHeaderMenu(headerMenu);

    const leftMenu = this.leftMenuDataArr.find(menu => menu.id === currentMenu.pid);
    this.clickLeftMenu(leftMenu);

    const subMenu = leftMenu.children.find(menu => menu.id === currentMenu.id);
    this.clickSubMenu(subMenu);

    return true;
  }


}
