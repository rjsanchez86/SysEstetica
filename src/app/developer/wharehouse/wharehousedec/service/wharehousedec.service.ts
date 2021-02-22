import { addProducto } from './../models/wharehousedec';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../../global/service/global-url.service';

@Injectable({
  providedIn: 'root'
})
export class WharehousedecService {
   private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) { }


  public obtenerSucursal(idsucursal: any) {
    return this.http.get(`${this.URL}movalmacenesm/sucursal/${idsucursal}`);
  }


  public obtenerAlmacen(id: any) {
    return this.http.get(`${this.URL}movalmacenesm/almacen/${id}`);
  }


  public obtenerAlmacenMerma(id: any) {
    return this.http.get(`${this.URL}movalmacenesm/almacenm/${id}`);
  }


  public obtenerProductos(ids: any, ida: any) {
    return this.http.get(`${this.URL}movalmacenesm/articulos/${ids}/${ida}`);
  }


  public obtenerProducto(ids: any, ida: any, idp: any) {
    return this.http.get(`${this.URL}movalmacenesm/articulo/${ids}/${ida}/${idp}`);
  }


  public obtenerProductoM(ids: any, idm: any, idp: any) {
    return this.http.get(`${this.URL}movalmacenesm/articulom/${ids}/${idm}/${idp}`);
  }


  public insertarProducto(addproducto: addProducto) {
    const params = JSON.stringify(addproducto);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}movalmacenesm/articulom/agregar`, params, { 'headers': headers });
  }
}
