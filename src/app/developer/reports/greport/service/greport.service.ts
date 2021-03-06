
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../../global/service/global-url.service';

@Injectable({
  providedIn: 'root'
})
export class GreportService {
  private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {
  }

  public obtenerReporteG(ids: any) {
    return this.http.get(`${this.URL}reporte/reporteg/${ids}`);
  }
}
