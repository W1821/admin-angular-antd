/**
 * http请求错误对象
 */
export class HttpError {

  // 响应状态码
  status: number;

  // 响应状态描述
  statusText: string;

  constructor(status, statusText) {
    this.status = status;
    this.statusText = statusText;
  }
}
