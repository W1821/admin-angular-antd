import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuService} from '../menu.service';
import {Menu} from '../menu.model';
import {MenuEditComponent} from '../edit/menu-edit.component';
import {ButtonAuthService} from '../../../main/button-auth.service';


@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit{

  /**
   * 权限按钮
   */
  authButtons = {
    search: false,
    add: false,
    addSub: false,
    edit: false,
    delete: false,
  };

  // 列表数据
  dataList: Menu[] = [];
  tableTree: Menu[] = [];

  /**
   * 调用子组件
   */
  @ViewChild('menuEdit', {static: false})
  private menuEdit: MenuEditComponent;


  constructor(private buttonAuthService: ButtonAuthService, private menuService: MenuService) {

  }

  ngOnInit(): void {
    console.log('MenuListComponent->ngOnInit');
    // 初始化权限按钮
    this.initAuthButtons();

    // 初始化表格数据
    this.search();
  }

  // 查询
  search = () => {
    if (!this.authButtons.search) {
      return;
    }
    this.menuService.list().then(res => {
      if (res) {
        const menus = this.menuService.getSortedMenuList(res.data);
        this.tableTree = this.menuService.getMenuTree(menus);
        this.dataList = this.menuService.getMenuList(res.data);
      }
    });
  };

  add = (id) => {
    this.menuEdit.openAddModal(id);
  };

  edit = (item) => {
    this.menuEdit.openEditModal(item.id);
  };

  delete = (item) => {
    this.menuService.delete(item.id).then(res => {
      if (res) {
        this.search();
      }
    });
  };

  /**
   * 初始化权限按钮
   */
  private initAuthButtons = (): void => {
    this.authButtons = this.buttonAuthService.getCurrentPageButtons(this.authButtons);
  };

}
