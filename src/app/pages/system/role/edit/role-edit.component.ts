import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {RoleService} from '../role.service';
import {Role} from '../role.model';
import {MainService} from '../../../main/main.service';
import {NzTreeSelectComponent} from 'ng-zorro-antd';
import {MenuService} from '../../menu/menu.service';


@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {

  role: Role = new Role();
  menuTreeList: any[] = [];

  // 默认展开的节点
  expandedMenuIds: any[] = [];

  showModal = false;

  @Output() saveRole = new EventEmitter<boolean>();

  @ViewChild('menuBtnTree', {static: false})
  private menuBtnTree: NzTreeSelectComponent;

  editFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private menuService: MenuService,
    private roleService: RoleService) {
  }

  ngOnInit() {
    // 表单初始化
    this.buildFormGroup();
    // 菜单树列表初始化
    this.initMenuTreeList();
  }

  /**
   * 增加页面
   */
  openAddModal = () => {
    this.role = new Role();
    this.openModal();
  };

  /**
   * 修改页面
   */
  openEditModal = (id: number) => {
    this.openModal();
    this.roleService.query(id).then(res => {
      if (res) {
        this.role.setDataValue(res.data);
        this.setFormValue();
      }
    });
  };

  /**
   * 保存
   */
  save = (): Promise<boolean> => {
    const body = this.getRequestBody();
    let promise;
    if (this.role.id !== undefined && this.role.id !== null) {
      // update
      promise = this.roleService.update(body);
    } else {
      // add
      promise = this.roleService.add(body);
    }
    return promise.then(res => {
      if (res) {
        // 保存成功，刷新list页面
        this.saveRole.emit();
      }
      return !!res;
    });
  };

  private getRequestBody = (): object => {
    console.log('save', this.role);
    console.log('save', this.editFormGroup.value);
    const body = {
      id: this.role.id,
      ...this.editFormGroup.value
    };
    // 用户角色
    if (body.menuButtonIds) {
      body.menuIds = [];
      body.buttonIds = [];
      body.menuButtonIds.forEach(id => {
        if (id.endsWith('btn')) {
          body.buttonIds.push(id.split('-')[0]);
        } else {
          body.menuIds.push(id);
        }
      });
    }
    delete body.menuButtonIds;
    return body;
  };

  /**
   * 弹窗
   */
  private openModal = (): void => {
    this.showModal = true;
  };

  /**
   * 表单赋值
   */
  private setFormValue = (): void => {
    const menuIds = this.role.menuIds ? this.role.menuIds.map(id => id + '') : [];
    const buttons = this.role.buttonIds ? this.role.buttonIds.map(id => id + '-btn') : [];
    this.editFormGroup.setValue({
      roleName: this.role.roleName,
      description: this.role.description,
      roleStatus: this.role.roleStatus,
      menuButtonIds: menuIds.concat(...buttons)
    });
    if (menuIds) {
      // 展开树
      this.expandTree(menuIds);
    }
  };

  private buildFormGroup = (): void => {
    this.editFormGroup = this.formBuilder.group({
      roleName: [null, [Validators.required]],
      description: [null],
      roleStatus: [null, [Validators.required]],
      menuButtonIds: [null],
    });
  };

  private initMenuTreeList = () => {
    this.menuTreeList = this.mainService.getMenuTreeData().map(menu => this.menuService.getTreeItem(menu));
  };

  private expandTree = (menuIds: string[]): void => {
    const pidsArr = this.mainService.getMenuListData()
      .filter(e => menuIds.findIndex(id => id === '' + e.id) >= 0 && e.pids)
      .map(e => e.pids);
    const pidList = menuIds.concat(...pidsArr.map(pids => pids.split(',')));
    this.expandedMenuIds = [...new Set(pidList)];
  };


}
