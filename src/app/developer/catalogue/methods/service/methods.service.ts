
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../../global/service/global-url.service';
import { Methods } from './../models/methods';

@Injectable({
  providedIn: 'root'
})
export class MethodsService {
   private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {

   }


  public obtenerMPagos() {
    return this.http.get(`${this.URL}mpagos`);
  }


  public insertarDatosMPagos(methods: Methods) {
    const params = JSON.stringify(methods);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}mpagos/agregar`, params, { 'headers': headers });
  }


  public actualizarDatosMPagos(id: string, methods: Methods) {
    const params = JSON.stringify(methods);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}mpagos/actualizar/${id}`, params, { 'headers': headers });
  }
}
