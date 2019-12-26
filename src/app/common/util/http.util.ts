import {HttpClient} from '@angular/common/http';
import {HttpError} from '../exception/http.error';
import {ServerResponse} from '../model/server.response';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class HttpUtil {

  constructor(public http: HttpClient) {
  }

  public get = (url, params, options): Promise<any> => {
    url = this.getUrlParams(url, params);
    return new Promise((resolve, reject) => this.doGet(url, options, resolve, reject));
  };

  public post = (url, body, options): Promise<any> => {
    return new Promise((resolve, reject) => this.doPost(url, body, options, resolve, reject));
  };


  /** ========================================= 私有方法 ========================================= */

  private getUrlParams = (url, params): string => {
    if (params) {
      const paramsArray = [];
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&');
      } else {
        url += '&' + paramsArray.join('&');
      }
    }
    return url;
  };

  private doGet = (url, options, resolve, reject): void => {
    const promise = this.http.get(url, options).toPromise();
    this.handlePromise(promise, resolve, reject);
  };

  private doPost = (url, body, options, resolve, reject): void => {
    const promise = this.http.post(url, body, options).toPromise();
    this.handlePromise(promise, resolve, reject);
  };

  /**
   * 此处会把http响应处理成为 ServerResponse对象
   * 也会把http error 处理成为 HttpError对象
   * 这样上层使用统一方便
   * @see ServerResponse
   * @see HttpError
   */
  private handlePromise = (promise: Promise<any>, resolve, reject): void => {
    promise

    // 把http服务端响应数据封装为 @see ServerResponse 对象
      .then(response => new ServerResponse(response))

      // 需要处理服务逻辑错误
      .then(response => this.handleResponse(response, resolve, reject))

      // 把HttpResponseError处理成为 HttpError对象
      .catch(error => {
        console.log('HttpUtil->handlePromise->catch', error);
        reject(new HttpError(error.status, error.statusText));
      });
  };

  /**
   * http请求响应码200，需要处理服务逻辑错误
   */
  private handleResponse = (response, resolve, reject): void => {
    if (response.success) {
      // 服务端的逻辑正确
      resolve(response);
    } else {
      // 服务端的逻辑错误
      reject(response);
    }
  };


}

