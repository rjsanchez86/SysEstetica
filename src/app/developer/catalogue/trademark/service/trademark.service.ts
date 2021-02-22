
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../../global/service/global-url.service';
import { Marca, SubMarca } from './../models/trademark';

@Injectable({
  providedIn: 'root'
})
export class TrademarkService {
   private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {

   }


  public obtenerMarca() {
    return this.http.get(`${this.URL}marca`);
  }


  public obtenerSubMarca(id: string) {
    return this.http.get(`${this.URL}submarca/${id}`);
  }


  public insertarDatosMarca(marca: Marca) {
    const params = JSON.stringify(marca);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}marca/agregar`, params, { 'headers': headers });
  }


  public insertarDatosSubMarca(id: string, submarca: string) {
    return this.http.get(`${this.URL}submarca/agregar/${id}/${submarca}`);
  }


  public actualizarDatosMarca(id: string, marca: Marca) {
    const params = JSON.stringify(marca);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}marca/actualizar/${id}`, params, { 'headers': headers });
  }
}
