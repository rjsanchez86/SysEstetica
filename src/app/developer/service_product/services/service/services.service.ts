
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../../global/service/global-url.service';
import { Services } from '../models/services';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
   private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {

  }


  public obtenerDatosServices() {
    return this.http.get(`${this.URL}servicios`);
  }


  public obtenerDatosClasificacion() {
    return this.http.get(`${this.URL}servicios/clasificacion`);
  }


  public insertarDatosServices(services: Services) {
    const params = JSON.stringify(services);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}servicios/agregar`, params, { 'headers': headers });
  }


  public actualizarDatosServices(id: string, services: Services) {
    const params = JSON.stringify(services);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}servicios/actualizar/${id}`, params, { 'headers': headers });
  }


  public porcentajeDatosServices(porcentaje: string) {
    const params = JSON.stringify('');
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}servicios/porcentaje/${porcentaje}`, params, { 'headers': headers });
  }
}
