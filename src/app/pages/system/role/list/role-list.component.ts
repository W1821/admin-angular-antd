import {Component, OnInit, ViewChild} from '@angular/core';

import {RoleService} from '../role.service';
import {Role} from '../role.model';
import {RoleEditComponent} from '../edit/role-edit.component';
import {ButtonAuthService} from '../../../main/button-auth.service';


@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  /**
   * 权限按钮
   */
  authButtons = {
    search: false,
    add: false,
    edit: false,
    delete: false,
  };

  // 查询参数
  searchBody = {
    roleName: null,
    roleStatus: null,
  };
  // 分页参数
  pageBody = {
    index: 1,
    size: 8,
  };
  // 总行数
  totalRows = 1;
  // 列表数据
  dataList: Role[];

  /**
   * 调用子组件
   */
  @ViewChild('roleEdit', {static: false})
  private roleEdit: RoleEditComponent;

  constructor(private buttonAuthService: ButtonAuthService, private roleService: RoleService) {

  }

  ngOnInit(): void {
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
    // 重置第一页
    this.pageBody.index = 1;
    this.getList();
  };

  add = () => {
    this.roleEdit.openAddModal();
  };

  edit = (item) => {
    this.roleEdit.openEditModal(item.id);
  };

  delete = (item) => {
    this.roleService.delete(item.id).then(res => {
      if (res) {
        this.search();
      }
    });
  };

  onPageIndexChange = () => {
    this.getList();
  };

  /**
   * 初始化权限按钮
   */
  private initAuthButtons = (): void => {
    this.authButtons = this.buttonAuthService.getCurrentPageButtons(this.authButtons);
  };

  /**
   * 获取数据
   */
  private getList = () => {
    const body = {...this.searchBody, ...this.pageBody};
    this.roleService.list(body).then(res => {
      if (!res) {
        return;
      }
      this.dataList = res.data.content.map(e => {
        const role = new Role();
        role.setDataValue(e);
        return role;
      });
      this.totalRows = res.data.totalElements;
    });
  };

}
