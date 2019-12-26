import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {LoginService} from './login.service';
import {NotificationService} from '../../common/service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;

  errorMsg;

  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private noticeService: NotificationService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    console.log('LoginComponent ngOnInit');

    this.validateForm = this.fb.group({
      userName: ['15256639988', [Validators.required]],
      password: ['2', [Validators.required]],
      remember: [true]
    });

    this.route.params.subscribe((params: Params) => {

      // 存在type表示不需要自动登录
      if (params.type) {
        console.log('LoginComponent ngOnInit 不需要自动登录', params);
        this.loginService.logout();
        return;
      }

      this.loginService.autoLogin().then(msg => {
        if (msg.success) {
          this.loginSuccess();
        }
      });
    });
  }

  /**
   * 登录方法
   */
  login() {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (!this.validateForm.valid) {
      this.errorMsg = null;
      return;
    }

    // 设置转圈
    this.loading = true;
    this.loginService.login(this.validateForm.value.userName, this.validateForm.value.password)
      .then(response => {
        console.log('login', response);
        // 取消设置转圈
        this.loading = false;
        if (!response) {
          this.errorMsg = '网络异常，请稍候再试';
          return;
        }
        if (response.success) {
          this.errorMsg = null;
          this.noticeService.success('登录成功');
          this.loginSuccess();
        } else {
          this.loginError(response);
        }
      });
  }

  private loginSuccess = (): void => {
    // 登陆成功，跳转到main页面，main页面默认打开第一个菜单
    console.log('登陆成功，跳转到', '/main');
    this.router.navigate(['/main']);
  };

  /**
   * 错误处理
   */
  private loginError = (error: any): any => {
    console.log('LoginService loginError', error);
    switch (error.status) {
      case 401:
        this.errorMsg = '用户名或密码错误';
        break;
      case 500:
        this.errorMsg = '系统错误，请稍候再试';
        break;
      default:
        this.errorMsg = '网络异常，请稍候再试';
        break;
    }
  };

}


