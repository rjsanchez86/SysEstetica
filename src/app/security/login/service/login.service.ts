
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../global/service/global-url.service';
import { Login, UserInterface  } from '../models/login';
import { isNullOrUndefined } from "util";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {
  }

  /* Validacion de usuario y contraseña */
  public loginuser(login: Login) {
    const params = JSON.stringify(login);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}seguridad/autentificacion`, params, { 'headers': headers });
  }
}
