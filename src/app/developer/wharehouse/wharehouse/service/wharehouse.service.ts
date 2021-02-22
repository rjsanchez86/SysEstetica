
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../../global/service/global-url.service';
import { Wherehouse } from './../models/whrehouse';

@Injectable({
  providedIn: 'root'
})
export class WharehouseService {
   private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {

  }


  public obtenerAlmacenes(idsucursal: any) {
    return this.http.get(`${this.URL}almacenes/${idsucursal}`);
  }


  public obtenerSucursal(idsucursal: any) {
    return this.http.get(`${this.URL}almacenes/sucursal/${idsucursal}`);
  }


  public insertarDatosAlmacenes(alamacen: Wherehouse) {
    const params = JSON.stringify(alamacen);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}almacenes/agregar`, params, { 'headers': headers });
  }


  public actualizarDatosAlmacenes(id: string, alamacen: Wherehouse) {
    const params = JSON.stringify(alamacen);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}almacenes/actualizar/${id}`, params, { 'headers': headers });
  }
}
