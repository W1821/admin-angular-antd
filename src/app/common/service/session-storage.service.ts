import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class SessionStorageService {

  private sessionStorage: Storage;

  constructor() {
    if (!sessionStorage) {
      console.log('Current browser does not support Local Storage');
    }
    this.sessionStorage = sessionStorage;
  }

  set = (key: string, value: any): void => {
    this.sessionStorage.setItem(key, JSON.stringify(value));
  };

  get = (key: string): any => {
    const value = this.sessionStorage.getItem(key);
    if (!value) {
      return null;
    }
    return JSON.parse(value);
  };

  remove = (key: string): void => {
    this.sessionStorage.removeItem(key);
  };

}
