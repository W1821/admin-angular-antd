import {Injectable} from '@angular/core';
import {HttpService} from '../../../common/service/http.service';


@Injectable()
export class UserService {

  constructor(private httpService: HttpService) {
  }

  list = (searchBody: object): Promise<any> => {
    return this.httpService.post('/user/list', searchBody).then(res => res, () => null);
  };

  delete = (id: any): Promise<any> => {
    return this.httpService.get('/user/delete/' + id).then(res => res, () => null);
  };

  add = (body: any): Promise<any> => {
    return this.httpService.post('/user/add', body).then(res => res, () => null);
  };

  update = (body: any): Promise<any> => {
    return this.httpService.post('/user/update', body).then(res => res, () => null);
  };

  query = (id: number): Promise<any> => {
    return this.httpService.get('/user/query/' + id).then(res => res, () => null);
  };

  roleList = (): Promise<any> => {
    return this.httpService.get('/role/main/list').then(res => res, () => null);
  };
}
