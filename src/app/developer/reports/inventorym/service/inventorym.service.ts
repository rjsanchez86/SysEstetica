
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../../global/service/global-url.service';

@Injectable({
  providedIn: 'root'
})
export class InventorymService {
   private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {}


  public obtenerInventarioM(ids: any) {
    return this.http.get(`${this.URL}reporte/inventariom/${ids}`);
  }
}
