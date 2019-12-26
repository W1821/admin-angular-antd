import {Injectable} from '@angular/core';
import {HttpService} from '../../../common/service/http.service';


@Injectable()
export class RoleService {

  constructor(private httpService: HttpService) {
  }

  list = (searchBody: object): Promise<any> => {
    return this.httpService.post('/role/list', searchBody).then(res => res, () => null);
  };

  delete = (id: any): Promise<any> => {
    return this.httpService.get('/role/delete/' + id).then(res => res, () => null);
  };

  add = (body: any): Promise<any> => {
    return this.httpService.post('/role/add', body).then(res => res, () => null);
  };

  update = (body: any): Promise<any> => {
    return this.httpService.post('/role/update', body).then(res => res, () => null);
  };

  query = (id: number): Promise<any> => {
    return this.httpService.get('/role/query/' + id).then(res => res, () => null);
  };

  menuList = (): Promise<any> => {
    return this.httpService.get('/menu/main/list').then(res => res, () => null);
  };
}
