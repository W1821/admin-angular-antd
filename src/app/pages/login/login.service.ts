import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

import {User} from '../system/user/user.model';

import {HttpService} from '../../common/service/http.service';
import {ServerResponse} from '../../common/model/server.response';
import {HttpError} from '../../common/exception/http.error';
import {SessionStorageService} from '../../common/service/session-storage.service';


@Injectable()
export class LoginService {

  private USER = 'user';

  get getUserInfo() {
    return this.sessionStorageService.get(this.USER);
  }

  get isLoggedIn() {
    return !!this.sessionStorageService.get(this.USER);
  }

  constructor(private httpService: HttpService, private sessionStorageService: SessionStorageService) {
  }

  /**
   * 发送登录请求
   */
  login(userName, password): Promise<any> {
    const authorization = 'Basic ' + btoa(userName + ':' + password);
    const httpHeaders = new HttpHeaders().set('Authorization', authorization);
    const options = {headers: httpHeaders};
    return this.httpService.getNotHandleError('system/login', null, options).then(this.loginSuccess, this.loginError);
  }

  /**
   * 退出
   */
  logout(): Promise<any> {
    // 这里可能是服务端退出登录有重定向功能
    return this.httpService.getNotHandleError('system/logout').then(this.logoutSuccess, this.logoutSuccess);
  }

  /**
   * 清理缓存
   */
  private clearLoginInfo(): void {
    this.sessionStorageService.clear();
  }

  /**
   * 登录成功处理逻辑
   */
  private loginSuccess = (response: ServerResponse): ServerResponse => {
    const userInfo = new User();
    userInfo.setDataValue(response.data);
    this.sessionStorageService.set(this.USER, userInfo);
    return response;
  };

  /**
   * 登录失败处理逻辑
   */
  private loginError = (error: ServerResponse | HttpError): ServerResponse | HttpError => {
    return error;
  };


  /**
   * 退出成功处理逻辑
   */
  private logoutSuccess = (): void => {
    this.clearLoginInfo();
  };

}
