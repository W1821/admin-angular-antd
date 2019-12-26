import {Injectable} from '@angular/core';

import {NzNotificationService} from 'ng-zorro-antd/notification';

@Injectable({providedIn: 'root'})
export class NotificationService {

  constructor(
    public noticeService: NzNotificationService) {
  }

  success(content: string): void {
    this.noticeService.success('成功', content, {nzDuration: 2000});
  }

  error(content: string): void {
    this.noticeService.error('失败', content, {nzDuration: 2000});
  }

}
