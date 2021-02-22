
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../../global/service/global-url.service';
import { Classification } from './../models/classification';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {
   private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {

   }


  public obtenerClasificacion() {
    return this.http.get(`${this.URL}clasificacion`);
  }


  public insertarDatosClasificacion(classification: Classification) {
    const params = JSON.stringify(classification);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}clasificacion/agregar`, params, { 'headers': headers });
  }


  public actualizarDatosClasificacion(id: string, classification: Classification) {
    const params = JSON.stringify(classification);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}clasificacion/actualizar/${id}`, params, { 'headers': headers });
  }
}
