
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../../global/service/global-url.service';
import { Company } from './../models/company';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
   private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {

   }


  public obtenerDatosCompanys() {
    return this.http.get(`${this.URL}empresa`);
  }


  public obtenerDatosCompany(id: string) {
    return this.http.get(`${this.URL}empresa/${id}`);
  }


  public insertarDatosCompany(company: Company) {
    const params = JSON.stringify(company);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}empresa/agregar`, params, { 'headers': headers });
  }


  public actualizarDatosCompany(id: string, company: Company) {
    const params = JSON.stringify(company);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}empresa/actualizar/${id}`, params, { 'headers': headers });
  }
}

