import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {User} from '../user.model';
import {Role} from '../../role/role.model';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User();
  headPictureUrl: string = null;
  roleList: any[] = [];

  showModal = false;

  @Output() saveUser = new EventEmitter<boolean>();

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {
    // 表单初始化
    this.buildFormGroup();
    // 查询角色列表
    this.initRoleList();
  }

  /**
   * 增加页面
   */
  openAddModal = () => {
    this.user = new User();
    this.headPictureUrl = null;
    console.log(this.user);
    this.openModal();
  };

  /**
   * 修改页面
   */
  openEditModal = (id: number) => {
    this.userService.query(id).then(res => {
      if (res) {
        this.user.setDataValue(res.data);
        this.headPictureUrl = res.data.headPictureUrl;
        this.setFormValue();
      }
    });
    this.openModal();
  };

  /**
   * 保存
   */
  save = (): Promise<boolean> => {
    const body = this.getRequestBody();
    let promise;
    if (this.user.id !== undefined && this.user.id !== null) {
      // update
      promise = this.userService.update(body);
    } else {
      // add
      promise = this.userService.add(body);
    }
    return promise.then(res => {
      if (res) {
        // 保存成功，刷新list页面
        this.saveUser.emit();
      }
      return !!res;
    });
  };

  private getRequestBody = (): object => {
    const body = {
      id: this.user.id,
      headPictureUrl: this.user.headPictureUrl,
      headPictureBase64: this.headPictureUrl,
      ...this.formGroup.value
    };
    // 用户角色
    if (body.roles) {
      body.roles = body.roles.map(id => {
        return {id};
      });
    }
    return body;
  };

  /**
   * 图片裁剪返回的base64格式
   */
  headPicture = (event: string) => {
    this.headPictureUrl = event;
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
    this.formGroup.setValue({
      userName: this.user.userName,
      password: null,
      phoneNumber: this.user.phoneNumber,
      accountStatus: this.user.accountStatus,
      roles: this.user.roles.map(role => role.id),
    });
  };

  private buildFormGroup = (): void => {
    this.formGroup = this.formBuilder.group({
      phoneNumber: [null, [Validators.required]],
      password: [null],
      userName: [null, [Validators.required]],
      accountStatus: [null, [Validators.required]],
      roles: [null],
    });
  };

  private initRoleList = (): void => {
    this.userService.roleList().then(res => {
      if (res) {
        this.roleList = res.data.map(role => {
          return {
            key: role.id,
            value: role.id,
            title: role.roleName,
          };
        });
      }
    });
  };

}
