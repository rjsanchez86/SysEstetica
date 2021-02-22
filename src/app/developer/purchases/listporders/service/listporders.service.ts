import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../../global/service/global-url.service';

@Injectable({
  providedIn: 'root'
})
export class ListpordersService {
  private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {
  }

  public obtenerListOrdenes(id: any) {
    return this.http.get(`${this.URL}ocompras/list/${id}`);
  }

  public autorizarOrdenes(id: any, ida:any) {
    return this.http.get(`${this.URL}ocompras/autorizar/${id}/${ida}`);
  }

  public async obtenerDetalleOrden(id: any) {
    const url = this.URL + 'ocompras/detalle/'+id;
    const response = await fetch(url);
    return await response.json();
  }
}
