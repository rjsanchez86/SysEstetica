
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../../global/service/global-url.service';
import { Staff, Estatus } from './../models/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
   private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {

   }


  public obtenerStaff() {
    return this.http.get(`${this.URL}personal`);
  }


  public obtenerDatosPuestos() {
    return this.http.get(`${this.URL}puestos`);
  }


  public obtenerClasificacion() {
    return this.http.get(`${this.URL}clasificacion`);
  }


  public insertarDatosStaff(staff: Staff) {
    const params = JSON.stringify(staff);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}personal/agregar`, params, { 'headers': headers });
  }


  public actualizarDatosStaff(id: string, staff: Staff) {
    const params = JSON.stringify(staff);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}personal/actualizar/${id}`, params, { 'headers': headers });
  }


  public actualizarEstatusStaff(id: string, estatus: Estatus) {
    const params = JSON.stringify(estatus);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}personal/estatus/${id}`, params, { 'headers': headers });
  }
}
