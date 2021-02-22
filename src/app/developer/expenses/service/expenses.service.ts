import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../global/service/global-url.service';
import { CGastos, Gastos } from "./../models/expenses";

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {}

  public obtenerGastos(idsucursal: any) {
    return this.http.get(`${this.URL}gastos/${idsucursal}`);
  }

  public obtenerSucursal(idsucursal: any) {
    return this.http.get(`${this.URL}gastos/sucursal/${idsucursal}`);
  }

  public obtenerCGastos() {
    return this.http.get(`${this.URL}gastos/cgastos`);
  }

  public obtenerTGastos() {
    return this.http.get(`${this.URL}gastos/tgastos`);
  }

  public insertarCGasto(cgastos: CGastos) {
    const params = JSON.stringify(cgastos);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}gastos/agregar/cgastos`, params, { 'headers': headers });
  }

  public insertarGasto(gastos: Gastos) {
    const params = JSON.stringify(gastos);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}gastos/agregar/gastos`, params, { 'headers': headers });
  }
}
