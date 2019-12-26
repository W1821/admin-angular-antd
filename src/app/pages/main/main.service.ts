import {Injectable} from '@angular/core';
import {HttpService} from '../../common/service/http.service';

import {Menu} from '../system/menu/menu.model';
import {MenuService} from '../system/menu/menu.service';
import {SessionStorageService} from '../../common/service/session-storage.service';

@Injectable()
export class MainService {

  // 菜单集合，扁平结构，易于查找
  private menuListData: Menu[] = [];
  // 缓存用户的菜单数据, 树状结构
  private menuTreeData: Menu[] = [];

  private REDIRECT_URL = 'redirectUrl';

  constructor(private httpService: HttpService, private menuService: MenuService, private sessionStorageService: SessionStorageService) {
  }

  getRedirectUrl = (): string => {
    return this.sessionStorageService.get(this.REDIRECT_URL);
  };

  setRedirectUrl = (redirectUrl): void => {
    this.sessionStorageService.set(this.REDIRECT_URL, redirectUrl);
  };

  getMenuListData = (): any[] => {
    return this.menuListData;
  };

  getMenuTreeData = (): any[] => {
    return this.menuTreeData;
  };

  /**
   * 处理用户的菜单数据
   */
  init(): Promise<any> {
    // 这里从后台数据库读取
    return this.httpService.get('/menu/main/list').then(this.setMenuData, error => error);
  }

  /**
   * 修改密码
   * @param data 请求体
   */
  modifyPwd(data: any): Promise<any> {
    return this.httpService.post('/user/modify/ownPwd', data);
  }


  private setMenuData = (response): void => {
    if (response) {
      const menus = this.menuService.getSortedMenuList(response.data);
      this.menuListData = menus;
      this.menuTreeData = this.menuService.getMenuTree(menus);
    }
  };


}

