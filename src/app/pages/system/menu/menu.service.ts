import {Injectable} from '@angular/core';
import {HttpService} from '../../../common/service/http.service';
import {Menu} from './menu.model';

@Injectable()
export class MenuService {

  constructor(private httpService: HttpService) {
  }

  list = (): Promise<any> => {
    return this.httpService.post('/menu/list').then(res => res, () => null);
  };

  delete = (id: any): Promise<any> => {
    return this.httpService.get('/menu/delete/' + id).then(res => res, () => null);
  };

  add = (body: any): Promise<any> => {
    return this.httpService.post('/menu/add', body).then(res => res, () => null);
  };

  update = (body: any): Promise<any> => {
    return this.httpService.post('/menu/update', body).then(res => res, () => null);
  };

  query = (id: number): Promise<any> => {
    return this.httpService.get('/menu/query/' + id).then(res => res, () => null);
  };

  getSortedMenuList = (data) => {
    return this.sortMenus(this.getMenuList(data));
  };

  getMenuList = (data) => {
    return data.map(e => {
      const menu = new Menu();
      menu.setDataValue(e);
      return menu;
    });
  };

  getMenuTree = (menus) => {
    // 最顶层的菜单数组
    const topMenus = menus.filter(e => !e.pid);
    // 递归添加下级
    topMenus.forEach(e => this.addChildrenMenus(e, menus));
    return topMenus;
  };

  /**
   * 生成菜单树对象
   */
  getTreeItem = (menu) => {
    const menuItem = {
      key: menu.id + '',
      value: menu.id,
      title: menu.menuName,
      disableCheckbox: true,
      selectable: false,
    };
    if (menu.children && menu.children.length > 0) {
      this.addChildrenTreeItem(menuItem, menu.children);
    }
    return menuItem;
  };

  /**
   * 排序数组对象
   */
  private sortMenus = (menus) => {
    return menus.sort((a, b) => a.rank - b.rank);
  };

  /**
   * 递归添加孩子节点
   */
  private addChildrenMenus = (parentMenu, menus) => {
    menus.forEach(e => {
      if (parentMenu.id === e.pid) {
        parentMenu.children.push(e);
        this.addChildrenMenus(e, menus);
      }
    });
  };

  /**
   * 添加孩子节点
   */
  private addChildrenTreeItem = (menuItem, children) => {
    menuItem.children = [];
    children.forEach(menu => {
      const childMenuItem = {
        key: menu.id + '',
        value: menu.id,
        title: menu.menuName,
        isLeaf: false,
        disableCheckbox: true,
        selectable: false,
        children: undefined,
      };
      if (menu.children && menu.children.length > 0) {
        this.addChildrenTreeItem(childMenuItem, menu.children);
      } else {
        childMenuItem.isLeaf = true;
        childMenuItem.disableCheckbox = false;
        // 添加按钮
        this.addMenuButtons(childMenuItem, menu);
      }
      menuItem.children.push(childMenuItem);
    });
  };

  private addMenuButtons = (childMenuItem: any, menu: Menu): void => {
    if (menu.buttons && menu.buttons.length > 0) {
      const buttons = menu.buttons.map(button => {
        return {
          key: button.id + '-btn',
          value: button.id + '-btn',
          title: button.buttonName,
          isLeaf: true,
          selectable: false,
        };
      });
      childMenuItem.isLeaf = false;
      childMenuItem.children = buttons;
    }
  };

}
