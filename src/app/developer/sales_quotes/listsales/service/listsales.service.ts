
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../../global/service/global-url.service';

@Injectable({
  providedIn: 'root'
})
export class ListsalesService {
  private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {
  }

  public obtenerVentas(id: any) {
    return this.http.get(`${this.URL}ventasl/ventas/${id}`);
  }

  public async detalleVenta(id: any) {
    const url = this.URL + 'ventas/ventasd/' + id;
    const response = await fetch(url);
    return await response.json();
  }

  public async obtenerDetalleVentas(id: any) {
    const url = this.URL + 'home/ventas/'+id;
    const response = await fetch(url);
    return await response.json();
  }

  public async obtenerDatosProductos(id: any) {
    const url = this.URL + 'home/productos/'+id;
    const response = await fetch(url);
    return await response.json();
  }

  public async obtenerMPagos() {
    const url = this.URL + 'ventas/mpagos';
    const response = await fetch(url);
    return await response.json();
  }

  public async obtenerArticulo(id: any, idsucursal: any) {
    const url = this.URL + 'ventas/articulos/'+id+'/'+idsucursal;
    const response = await fetch(url);
    return await response.json();
  }

  public async obtenerDatosPersonal() {
    const url = this.URL + 'ventas/personal';
    const response = await fetch(url);
    return await response.json();
  }

  public async obtenerDatosComision(idart: any, idper: any) {
    const url = this.URL + 'ventas/comision/'+idart+'/'+idper;
    const response = await fetch(url);
    return await response.json();
  }

  public async obtenerDatosMerma() {
    const url = this.URL + 'ventas/merma';
    const response = await fetch(url);
    return await response.json();
  }

  public async accesoDatos(usuario: any, password: any) {
    const url = this.URL + 'ventas/acceso/' + usuario + '/' + password;
    const response = await fetch(url);
    return await response.json();
  }

  public async obtenerMerma(id: any) {
    const url = this.URL + 'ventas/merma/'+id;
    const response = await fetch(url);
    return await response.json();
  }

  public insertarFinalVenta(venta: any, idc: any, ids: any, mpago:any, descuento:any) {
    const params = JSON.stringify(venta);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}ventas/finalizarhome/${idc}/${ids}/${mpago}/${descuento}`, params, { 'headers': headers });
  }
}
