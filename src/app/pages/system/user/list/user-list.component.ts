import {Component, OnInit, ViewChild} from '@angular/core';

import {UserService} from '../user.service';
import {User} from '../user.model';
import {UserEditComponent} from '../edit/user-edit.component';
import {ButtonAuthService} from '../../../main/button-auth.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

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
    userName: null,
    phoneNumber: null,
  };
  // 分页参数
  pageBody = {
    index: 1,
    size: 8,
  };
  // 总行数
  totalRows = 1;
  // 列表数据
  dataList: User[];

  /**
   * 调用子组件
   */
  @ViewChild('userEdit', {static: false})
  private userEdit: UserEditComponent;

  constructor(private buttonAuthService: ButtonAuthService, private userService: UserService) {
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
    this.userEdit.openAddModal();
  };

  edit = (item) => {
    this.userEdit.openEditModal(item.id);
  };

  delete = (item) => {
    this.userService.delete(item.id).then(res => {
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
    this.userService.list(body).then(res => {
      if (!res) {
        return;
      }
      this.dataList = res.data.content.map(e => {
        const user = new User();
        user.setDataValue(e);
        return user;
      });
      this.totalRows = res.data.totalElements;
    });
  };

}
