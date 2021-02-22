
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../global/service/global-url.service';
import { Usuarios, Estatus } from './../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
   private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {

  }


  public obtenerUsuarios() {
    return this.http.get(`${this.URL}seguridad/usuarios`);
  }


  public obtenerPersonal() {
    return this.http.get(`${this.URL}seguridad/personal`);
  }


  public obtenerPerfil() {
    return this.http.get(`${this.URL}seguridad/perfil`);
  }


  public obtenerSucursal() {
    return this.http.get(`${this.URL}seguridad/sucursales`);
  }


  public insertarDatosUsuarios(usuarios: Usuarios) {
    const params = JSON.stringify(usuarios);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}seguridad/usuarios/agregar`, params, { 'headers': headers });
  }


  public actualizarDatosUsuarios(id: string, usuarios: Usuarios) {
    const params = JSON.stringify(usuarios);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}seguridad/usuarios/actualizar/${id}`, params, { 'headers': headers });
  }


  public actualizarEstatusUsuarios(id: string, estatus: Estatus) {
    const params = JSON.stringify(estatus);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}seguridad/usuarios/estatus/${id}`, params, { 'headers': headers });
  }
}
