
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../../global/service/global-url.service';
import { Quotes, Cliente, Cancelar, Agenda } from '../models/quotes';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
   private URL: any  = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) {}

  public obtenerCalendario(idsucursal: any) {
    return this.http.get(`${this.URL}cita/calendario/${idsucursal}`);
  }

  public obtenerDetalleAgenda(id: string) {
    return this.http.get(`${this.URL}cita/agenda/${id}`);
  }

  public obtenerListaAgenda() {
    return this.http.get(`${this.URL}cita/lista`);
  }

  public obtenerDatosClientes() {
    return this.http.get(`${this.URL}cita/clientes`);
  }

  public obtenerDatosSucursal(idsucursal: any) {
    return this.http.get(`${this.URL}cita/sucursal/${idsucursal}`);
  }

  public obtenerDatosArticulos() {
    return this.http.get(`${this.URL}cita/articulo`);
  }

  public obtenerDatosPersonal() {
    return this.http.get(`${this.URL}cita/personal`);
  }

  public insertarAgenda(agenda: Quotes) {
    const params = JSON.stringify(agenda);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}cita/agregar`, params, { 'headers': headers });
  }

  public insertarDatosCliente(cliente: Cliente) {
    const params = JSON.stringify(cliente);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}cita/clientes/agregar`, params, { 'headers': headers });
  }

  public actualizarEstatusCita(id: string, cancelar: Cancelar) {
    const params = JSON.stringify(cancelar);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}cita/cancelar/${id}`, params, { 'headers': headers });
  }

  public actualizarCita(id: string, agenda: Agenda) {
    const params = JSON.stringify(agenda);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}cita/actualizar/${id}`, params, { 'headers': headers });
  }
}
