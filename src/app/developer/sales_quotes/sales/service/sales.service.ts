import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../../global/service/global-url.service';
import { Cliente } from '../models/sales';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {}

  public obtenerDatosClientes() {
    return this.http.get(`${this.URL}ventas/clientes`);
  }

  public obtenerDatosProductos(id: any) {
    return this.http.get(`${this.URL}ventas/productos/${id}`);
  }

  public obtenerSucursal(idsucursal: any) {
    return this.http.get(`${this.URL}ventas/sucursal/${idsucursal}`);
  }

  public obtenerDatosPersonal() {
    return this.http.get(`${this.URL}ventas/personal`);
  }

  public obtenerDatosMerma(id: any) {
    return this.http.get(`${this.URL}ventas/mermas/${id}`);
  }

  public obtenerDatosComision(idart: any, idper: any) {
    return this.http.get(`${this.URL}ventas/comision/${idart}/${idper}`);
  }

  public obtenerArticulo(id: any, idsucursal: any) {
    return this.http.get(`${this.URL}ventas/articulos/${id}/${idsucursal}`);
  }

  public obtenerMerma(id: any) {
    return this.http.get(`${this.URL}ventas/merma/${id}`);
  }

  public obtenerMPagos() {
    return this.http.get(`${this.URL}ventas/mpagos`);
  }

  public insertarDatosCliente(cliente: Cliente) {
    const params = JSON.stringify(cliente);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}ventas/clientes/agregar`, params, { 'headers': headers });
  }

  public insertarGuardarVenta(venta: any, idc: any, ids: any, mpago:any, descuento:any) {
    const params = JSON.stringify(venta);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}ventas/agregar/${idc}/${ids}/${mpago}/${descuento}`, params, { 'headers': headers });
  }

  public insertarFinalVenta(venta: any, idc: any, ids: any, mpago:any, descuento:any) {
    const params = JSON.stringify(venta);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}ventas/finalizar/${idc}/${ids}/${mpago}/${descuento}`, params, { 'headers': headers });
  }

  public async detalleVenta(id: any) {
    const url = this.URL + 'ventas/ventasd/' + id;
    const response = await fetch(url);
    return await response.json();
  }

  public async accesoDatos(usuario: any, password: any) {
    const url = this.URL + 'ventas/acceso/' + usuario + '/' + password;
    const response = await fetch(url);
    return await response.json();
  }
}
