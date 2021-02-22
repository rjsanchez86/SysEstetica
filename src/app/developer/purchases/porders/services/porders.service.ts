import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../../global/service/global-url.service';

@Injectable({
  providedIn: 'root'
})
export class PordersService {
  private URL: any = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) { }

  public obtenerSucursal(idsucursal: any) {
    return this.http.get(`${this.URL}ocompras/sucursal/${idsucursal}`);
  }

  public obtenerProveedor() {
    return this.http.get(`${this.URL}ocompras/proveedor`);
  }

  public obtenerProductos(id: any) {
    return this.http.get(`${this.URL}ocompras/productos/${id}`);
  }

  public obtenerArticulo(id: any, ids: any) {
    return this.http.get(`${this.URL}ocompras/articulo/${id}/${ids}`);
  }

  public insertarOrden(idu: any, ids: any, articulo: any) {
    const params = JSON.stringify(articulo);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}ocompras/agregar/${idu}/${ids}`, params, { 'headers': headers });
  }
}
