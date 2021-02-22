
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../global/service/global-url.service';
import { Perfil } from './../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
   private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {

  }


  public obtenerPerfil() {
    return this.http.get(`${this.URL}seguridad/perfil`);
  }


  public obtenerPaginas() {
    return this.http.get(`${this.URL}seguridad/paginas`);
  }


  public insertarDatosPerfil(perfil: Perfil) {
    const params = JSON.stringify(perfil);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}seguridad/perfil/agregar`, params, { 'headers': headers });
  }


  public actualizarDatosPerfil(id: string, perfil: Perfil) {
    const params = JSON.stringify(perfil);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}seguridad/perfil/actualizar/${id}`, params, { 'headers': headers });
  }
}
