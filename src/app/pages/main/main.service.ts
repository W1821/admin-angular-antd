import {Injectable} from '@angular/core';
import {HttpService} from '../../common/service/http.service';
import {MenuService} from '../system/menu/menu.service';
import {SessionStorageService} from '../../common/service/session-storage.service';
import {Menu} from '../system/menu/menu.model';

@Injectable()
export class MainService {

  // 菜单集合，扁平结构，易于查找
  private menuDataList: Menu[] = [];
  // 缓存用户的菜单数据, 树状结构
  private menuDataTree: Menu[] = [];

  private REDIRECT_URL = 'redirectUrl';
  private MENU_DATA_LIST = 'menuDataList';
  private MENU_DATA_TREE = 'menuDataTree';

  constructor(private httpService: HttpService, private menuService: MenuService, private sessionStorageService: SessionStorageService) {
  }

  getRedirectUrl = (): string => {
    return this.sessionStorageService.get(this.REDIRECT_URL);
  };

  setRedirectUrl = (redirectUrl): void => {
    this.sessionStorageService.set(this.REDIRECT_URL, redirectUrl);
  };

  getMenuDataList = (): Menu[] => {
    return this.menuDataList;
  };

  getMenuDataTree = (): Menu[] => {
    return this.menuDataTree;
  };

  /**
   * 处理用户的菜单数据
   */
  init(): Promise<any> {
    const redirectUrl = this.getRedirectUrl();
    if (redirectUrl) {
      this.menuDataList = this.sessionStorageService.get(this.MENU_DATA_LIST);
      this.menuDataTree = this.sessionStorageService.get(this.MENU_DATA_TREE);
      return Promise.resolve();
    }
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
      this.menuDataList = this.menuService.getSortedMenuList(response.data);
      this.menuDataTree = this.menuService.getMenuTree(this.menuDataList);

      this.sessionStorageService.set(this.MENU_DATA_LIST, this.menuDataList);
      this.sessionStorageService.set(this.MENU_DATA_TREE, this.menuDataTree);
    }
  };


}

