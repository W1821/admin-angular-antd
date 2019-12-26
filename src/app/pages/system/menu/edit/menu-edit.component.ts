import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../../common/service/notification.service';
import {MenuService} from '../menu.service';
import {Button, Menu} from '../menu.model';
import {MenuButtonModalComponent} from './menu-button-modal.component';


@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent implements OnInit, OnChanges {

  // 修改页面，表示修改的是哪个
  id: number;
  menu: Menu = new Menu();
  // 上级菜单列表
  @Input() dataList: any[];
  menuList: any[] = [];

  // 修改页面是否打开过
  opened = false;

  // 是否显示按钮
  canShowAddButton = false;

  buttons: Button[] = [];

  showEditModal = false;
  showSelectIconModal = false;

  @ViewChild('buttonEditModal', {static: false})
  private buttonEditModal: MenuButtonModalComponent;

  @Output() saveMenuEvent = new EventEmitter<boolean>();

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private menuService: MenuService, private noticeService: NotificationService) {

  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      pid: [null],
      menuName: [null, [Validators.required]],
      routePath: [null],
      icon: [null],
      rank: [null],
      actions: [null],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.menuList = this.dataList.filter(menu => menu.pids.split(',').length < 2);
  }

  /**
   * 增加页面
   */
  openAddModal = (id: number) => {
    this.menu = new Menu();
    this.openModal();
    if (id !== null) {
      // 增加菜单
      this.formGroup.get('pid').setValue(id);
    }
  };

  /**
   * 修改页面
   */
  openEditModal = (id: number) => {
    this.id = id;
    this.menuService.query(id).then(res => {
      if (res) {
        this.menu = new Menu();
        this.menu.setDataValue(res.data);
        // 表单赋值
        this.setFormValue(this.menu);
        // 关联按钮显示
        this.buttons = this.menu.buttons;
      }
    });
    this.openModal();
  };

  /**
   * 保存
   */
  save = (): Promise<boolean> => {
    const pids = this.getPids();

    if (pids.split(',').length > 2) {
      this.noticeService.error('请选择正确的上级菜单，三级菜单不可作为上级菜单');
      return Promise.resolve(false);
    }

    const body = {id: this.id, pids, ...this.formGroup.getRawValue(), buttons: this.buttons};
    let promise;
    if (this.id !== undefined && this.id !== null) {
      promise = this.menuService.update(body);
    } else {
      promise = this.menuService.add(body);
    }
    return promise.then(res => {
      if (res) {
        // 保存成功，刷新list页面
        this.saveMenuEvent.emit();
      }
      return !!res;
    });
  };

  changePid = (value) => {
    if (!value) {
      this.canShowAddButton = false;
    } else {
      const pMenu = this.menuList.find(m => m.id === value);
      this.canShowAddButton = !!(pMenu && pMenu.pids && pMenu.pids.split(',').length === 1);
    }
  };

  /**
   * 打开编辑按钮弹窗
   */
  openButtonModal = (index, button: Button) => {
    this.buttonEditModal.openModal(index, button);
  };

  editButtonSuccess = (event: any) => {
    const button = new Button(event.button);
    const index = event.index;
    if (index === null) {
      // 增加
      this.buttons.push(button);
    } else {
      // 修改
      this.buttons.splice(index, 1, button);
    }
  };

  onButtonClose = (button: Button): void => {
    this.buttons = this.buttons.filter(b => b !== button);
  };

  afterCloseModal = () => {
    // 清空按钮组
    this.buttons = [];
  };

  openSelectIconModal = () => {
    this.showSelectIconModal = true;
  };

  selectIconBack(event: string) {
    this.formGroup.get('icon').setValue(event);
  }

  /**
   * 弹窗
   */
  private openModal(): void {
    this.showEditModal = true;
    // 打开过一次就不增加 --无-- 选项了
    if (this.opened) {
      return;
    }
    this.opened = true;
    this.menuList = [{id: '', showName: '--无--'}, ...this.menuList];

  }

  private setFormValue = (menu: Menu): void => {
    this.formGroup.setValue({
      pid: menu.pid ? menu.pid : '',
      menuName: menu.menuName,
      routePath: menu.routePath,
      icon: menu.icon,
      rank: menu.rank,
      actions: menu.actions,
    });
  };

  private getPids = () => {
    let pids = '';
    const pidMenu = this.menuList.find(menu => this.formGroup.getRawValue().pid === menu.id);
    if (pidMenu) {
      pids = pidMenu.pids ? pidMenu.pids + ',' + pidMenu.id : pidMenu.id + '';
    }
    return pids;
  };

}
