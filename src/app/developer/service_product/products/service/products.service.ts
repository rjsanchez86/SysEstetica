
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../../global/service/global-url.service';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
   private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {

  }


  public obtenerDatosProducts() {
    return this.http.get(`${this.URL}productos`);
  }


  public obtenerDatosProveedor() {
    return this.http.get(`${this.URL}productos/proveedor`);
  }


  public obtenerDatosMarca() {
    return this.http.get(`${this.URL}productos/marca`);
  }


  public obtenerDatosSubMarca(id: string) {
    return this.http.get(`${this.URL}productos/submarca/${id}`);
  }


  public insertarDatosProducts(products: Products) {
    const params = JSON.stringify(products);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}productos/agregar`, params, { 'headers': headers });
  }


  public actualizarDatosProducts(id: string, products: Products) {
    const params = JSON.stringify(products);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}productos/actualizar/${id}`, params, { 'headers': headers });
  }


  public porcentajeDatosProducts(porcentaje: string) {
    const params = JSON.stringify('');
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}productos/porcentaje/${porcentaje}`, params, { 'headers': headers });
  }
}
