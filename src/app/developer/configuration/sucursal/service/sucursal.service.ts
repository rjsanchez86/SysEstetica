
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../../global/service/global-url.service';
import { Sucursal, Estatus } from './../models/sucursal';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
   private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {

   }


  public obtenerDatosSucursales() {
    return this.http.get(`${this.URL}sucursal`);
  }


  public obtenerDatosSucursal(id: string) {
    return this.http.get(`${this.URL}sucursal/${id}`);
  }


  public obtenerDatosCompanys() {
    return this.http.get(`${this.URL}empresa`);
  }


  public insertarDatosSucursal(sucursal: Sucursal) {
    const params = JSON.stringify(sucursal);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}sucursal/agregar`, params, { 'headers': headers });
  }


  public actualizarDatosSucursal(id: string, sucursal: Sucursal) {
    const params = JSON.stringify(sucursal);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}sucursal/actualizar/${id}`, params, { 'headers': headers });
  }


  public actualizarEstatusSucursal(id: string, estatus: Estatus) {
    const params = JSON.stringify(estatus);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}sucursal/estatus/${id}`, params, { 'headers': headers });
  }
}
