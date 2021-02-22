
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../../global/service/global-url.service';
import { Workstation, Comision } from './../models/workstation';

@Injectable({
  providedIn: 'root'
})
export class WorkstationService {
   private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {

  }


  public obtenerDatosPuestos() {
    return this.http.get(`${this.URL}puestos`);
  }


  public obtenerDatosComision(id: string) {
    return this.http.get(`${this.URL}puestos/comision/${id}`);
  }


  public insertarDatosPuestos(workstation: Workstation) {
    const params = JSON.stringify(workstation);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}puestos/agregar`, params, { 'headers': headers });
  }


  public actualizarDatosPuestos(id: string, workstation: Workstation) {
    const params = JSON.stringify(workstation);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}puestos/actualizar/${id}`, params, { 'headers': headers });
  }


  public insertarComision(id: string, comision: Comision) {
    const params = JSON.stringify(comision);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}puestos/comision/agregar/${id}`, params, { 'headers': headers });
  }
}
