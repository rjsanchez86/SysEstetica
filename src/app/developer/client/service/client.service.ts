
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../global/service/global-url.service';
import { Cliente } from './../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
   private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {

   }


  public obtenerDatosClientes() {
    return this.http.get(`${this.URL}clientes`);
  }


  public obtenerDatosCliente(id: string) {
    return this.http.get(`${this.URL}clientes/${id}`);
  }


  public insertarDatosCliente(cliente: Cliente) {
    const params = JSON.stringify(cliente);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}clientes/agregar`, params, { 'headers': headers });
  }


  public actualizarDatosCliente(id: string, cliente: Cliente) {
    const params = JSON.stringify(cliente);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}clientes/actualizar/${id}`, params, { 'headers': headers });
  }
}
