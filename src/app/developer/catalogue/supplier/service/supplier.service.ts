
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../../global/service/global-url.service';
import { Supplier } from './../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
   private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {

   }


  public obtenerProveedor() {
    return this.http.get(`${this.URL}proveedor`);
  }


  public insertarDatosProveedor(supplier: Supplier) {
    const params = JSON.stringify(supplier);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}proveedor/agregar`, params, { 'headers': headers });
  }


  public actualizarDatosProveedor(id: string, supplier: Supplier) {
    const params = JSON.stringify(supplier);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}proveedor/actualizar/${id}`, params, { 'headers': headers });
  }
}
