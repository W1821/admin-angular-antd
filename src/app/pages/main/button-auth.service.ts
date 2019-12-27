import {Injectable} from '@angular/core';
import {MainService} from './main.service';
import {Router} from '@angular/router';

@Injectable()
export class ButtonAuthService {

  constructor(private router: Router, private mainService: MainService) {
  }

  /**
   * 获取当前页面的授权按钮
   */
  getCurrentPageButtons = (authButtons: any): any => {
    const menu = this.mainService.getMenuDataList().find(m => m.routePath === this.router.url);
    if (!menu) {
      return authButtons;
    }

    const pageButtons = menu.buttons.map(b => b.code);

    if (pageButtons) {
      Object.keys(authButtons).forEach(ab => authButtons[ab] = !!pageButtons.find(pb => pb === ab));
    }
    return authButtons;
  };

}
