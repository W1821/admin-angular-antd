import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {NotificationService} from './notification.service';
import {HttpUtil} from '../util/http.util';
import {ServerResponse} from '../model/server.response';
import {HttpError} from '../exception/http.error';

@Injectable({providedIn: 'root'})
export class HttpService {

  constructor(
    public httpUtil: HttpUtil,
    public router: Router,
    public noticeService: NotificationService) {
  }

  get = (url, params?: null, options?: {}): Promise<any> => {
    const promise = this.httpUtil.get(url, params, options)
      .then(
        response => this.handleSuccess(response),
        response => this.handleError(response)
      );
    return this.handleResponse(promise);
  };

  getNotHandleError = (url, params?: null, headers?: {}): Promise<any> => {
    const promise = this.httpUtil.get(url, params, headers)
      .then(
        response => this.handleSuccess(response),
        response => this.handleError(response, false)
      );
    return this.handleResponse(promise);
  };

  post = (url, body?: {}, headers?: {}): Promise<any> => {
    const promise = this.httpUtil.post(url, body, headers).then(
      response => this.handleSuccess(response),
      response => this.handleError(response)
    );
    return this.handleResponse(promise);
  };

  postNotHandleError = (url, body?: {}, headers?: {}): Promise<any> => {
    const promise = this.httpUtil.post(url, body, headers).then(
      response => this.handleSuccess(response),
      response => this.handleError(response, false)
    );
    return this.handleResponse(promise);
  };


  /**
   * 让上级处理错误
   */
  private handleResponse = (promise: Promise<ServerResponse | HttpError>): Promise<ServerResponse | HttpError> => {
    return promise
      .then(response => {
        // HttpError
        if (response instanceof HttpError) {
          return Promise.reject(response);
        }

        // ServerResponse
        if (response.success) {
          return Promise.resolve(response);
        }
        // http响应码是200，但是服务端返回逻辑错误
        return Promise.reject(response);
      });
  };

  /**
   * 获取http请求成功处理
   * @param serverResponse ServerResponse对象
   */
  private handleSuccess = (serverResponse: ServerResponse): ServerResponse => {
    return serverResponse;
  };

  private handleError = (error: ServerResponse | HttpError, needNotice = true): ServerResponse | HttpError => {
    console.log('HttpService handleError', error, typeof error, needNotice);

    // 如果请求需要通知
    if (needNotice) {

      if (error instanceof HttpError) {
        this.handleHttpError(error);
      }

      if (error instanceof ServerResponse) {
        this.handleServerResponseError(error);
      }
    }

    return error;

  };


  /**
   * http请求失败
   */
  private handleHttpError = (httpError: HttpError) => {
    console.log('HttpService handleHttpError', httpError);
    const status = httpError.status;
    if (status === 401) {
      this.noticeService.error('未登录状态，请登录');
      this.router.navigate(['login', 1]);
      return;
    }
    this.noticeService.error(status + '错误,请联系管理员');
  };

  /**
   * 处理服务端返回的逻辑错误
   */
  private handleServerResponseError = (serverResponse: ServerResponse) => {
    console.log('HttpService handleServerResponseError', serverResponse);
    this.noticeService.error(serverResponse.code + '错误！' + serverResponse.msg);
  };


}
