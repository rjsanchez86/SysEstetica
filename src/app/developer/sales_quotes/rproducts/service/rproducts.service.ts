import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../../global/service/global-url.service';
import { DTicket } from './../models/rproducts';

@Injectable({
  providedIn: 'root'
})
export class RproductsService {
  private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) { }


  public obtenerSucursal(idsucursal: any) {
    return this.http.get(`${this.URL}devolucion/sucursal/${idsucursal}`);
  }


  public obtenerTicket(idsucursal: any) {
    return this.http.get(`${this.URL}devolucion/ticket/${idsucursal}`);
  }


  public obtenerArticulos(idventa: any) {
    return this.http.get(`${this.URL}devolucion/articulos/${idventa}`);
  }

  public obtenerDevoluciones(idsucursal: any) {
    return this.http.get(`${this.URL}devolucion/${idsucursal}`);
  }

  public async detalleVenta(id: any) {
    const url = this.URL + 'ventas/ventasd/' + id;
    const response = await fetch(url);
    return await response.json();
  }

  public async detalleVentad(id: any) {
    const url = this.URL + 'ventas/ventasd/devolucion/' + id;
    const response = await fetch(url);
    return await response.json();
  }

  public insertarGuardarDevolucion(dticket: DTicket) {
    const params = JSON.stringify(dticket);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}devolucion/agregar`, params, { 'headers': headers });
  }
}
