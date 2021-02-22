import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private storageService: StorageService) { }

  // Agrega el json
  setJsonValue(key: string, value: any) {
    this.storageService.secureStorage.setItem(key, value);
  }
  // Obtienen el json
  getJsonValue(key: string) {
    return this.storageService.secureStorage.getItem(key);
  }
  // Limpia el token
  clearToken() {
    return this.storageService.secureStorage.clear();
  }
  /*Obtener el usuario*/
  getCurrentUser(key: string) {
    let user_string = this.storageService.secureStorage.getItem(key);
    if (!isNullOrUndefined(user_string)) {
      return true;
    } else {
      return null;
    }
  }
}
