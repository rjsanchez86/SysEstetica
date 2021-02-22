
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../../global/service/global-url.service';
import { Proceso } from './../models/wharehousemov';

@Injectable({
  providedIn: 'root'
})
export class WharehousemovService {
   private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {}

  public obtenerProcesos() {
    return this.http.get(`${this.URL}movalmacenes/procesos`);
  }

  public obtenerSucursal(idsucursal: any) {
    return this.http.get(`${this.URL}movalmacenes/sucursal/${idsucursal}`);
  }

  public obtenerAlmacen(id: any) {
    return this.http.get(`${this.URL}movalmacenes/almacen/${id}`);
  }

  public obtenerProveedor() {
    return this.http.get(`${this.URL}movalmacenes/proveedor`);
  }

  public obtenerProductos(id: any) {
    return this.http.get(`${this.URL}movalmacenes/productos/${id}`);
  }

  public obtenerArticulo(id: any) {
    return this.http.get(`${this.URL}movalmacenes/articulo/${id}`);
  }

  public insertarDatosKardex(alamacen: any) {
    const params = JSON.stringify(alamacen);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post(`${this.URL}movalmacenes/kardex`, params, { 'headers': headers });
  }
}
