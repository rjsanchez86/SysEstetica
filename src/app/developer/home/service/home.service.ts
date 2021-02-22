import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalUrlService } from './../../../global/service/global-url.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private URL: any = this._url.ObtenetURL();

  constructor(private _url: GlobalUrlService, private http: HttpClient) { }

  public async obtenerDatosUbicacion() {
    const API_ENDPOINT = this.URL + 'home/clima';
    const response = await fetch(API_ENDPOINT);
    return await response.json();
  }

  public async obtenerDatosClima(longitud: string, latitud: string) {
    const response = await fetch(
      'https://api.openweathermap.org/data/2.5/weather?lat=' +
      longitud +
      '&lon=' +
      latitud +
      '&lang=es&units=metric&appid=6eb9e67f5fc3310d07c31216d7c7885c'
    );
    return await response.json();
  }

    /**Obtene un reporte de ventas, gastos y caja
   * id=> Id de sucursala
   */
  public async obtenerRDiario(id: any) {
    const url = this.URL + 'home/rdiario/' + id;
    const response = await fetch(url);
    return await response.json();
  }

  /**Lista de la Agenda
   * id=> id de la sucursal
   */
  public async obtenerDatosAgenda(id: any) {
    const url = this.URL + 'home/agenda/' + id;
    const response = await fetch(url);
    return await response.json();
  }

  /**Obetener datos de la venta
   * id=> Datos del id agendado
   */
  public async obtenerDatosVentas(id: any) {
    const url = this.URL + 'home/ventasl/' + id;
    const response = await fetch(url);
    return await response.json();
  }

  /**Obtienen los detalles del producto
   * id=> Id del producto
   */
  public async obtenerDatosProductos(id: any) {
    const url = this.URL + 'home/productos/' + id;
    const response = await fetch(url);
    return await response.json();
  }

  /**Obtener los datos del personal */
  public async obtenerDatosPersonal() {
    const url = this.URL + 'ventas/personal';
    const response = await fetch(url);
    return await response.json();
  }

  /**Obtiene el catalago de comision
   * idart=> Id del articulo
   * idper=> Id del personal
   */
  public async obtenerDatosComision(idart: any, idper: any) {
    const url = this.URL + 'ventas/comision/' + idart + '/' + idper;
    const response = await fetch(url);
    return await response.json();
  }

  /**Obtener catalogo de pagos */
  public async obtenerMPagos() {
    const url = this.URL + 'ventas/mpagos';
    const response = await fetch(url);
    return await response.json();
  }

  /* Obtiene los detalle la un producto o servicio */
  public async obtenerDatosMerma() {
    const url = this.URL + 'ventas/merma';
    const response = await fetch(url);
    return await response.json();
  }

  /* Obtiene los detalle la un producto o servicio
    id-> identificador de producto */
  public async obtenerMerma(id: any) {
    const url = this.URL + 'ventas/merma/' + id;
    const response = await fetch(url);
    return await response.json();
  }

  /* Obtiene los detalle la un producto o servicio
    id-> identificador de producto */
  public async obtenerArticulo(id: any, idsucursal: any) {
    const url = this.URL + 'ventas/articulos/' + id + '/' + idsucursal;
    const response = await fetch(url);
    return await response.json();
  }

  /* Obtiene los detalle la un producto o servicio
    id-> identificador de producto */
  public async obtenerDetalleVentas(id: any) {
    const url = this.URL + 'home/ventas/' + id;
    const response = await fetch(url);
    return await response.json();
  }

  /* Obtiene los detalle de la agenda
    id-> identificador de la cita */
  public async actualizarAgenda(id: any) {
    const url = this.URL + 'home/agenda/actualizar/' + id;
    const response = await fetch(url);
    return await response.json();
  }

  /* Guarda el motivo de la cancelacion
   * id-> identificador de la cita
   * observacion-> texto detalle */
  public async canceladaAgenda(id: any, observacion: any) {
    const url = this.URL + 'home/agenda/cancelar/' + id + '/' + observacion;
    const response = await fetch(url);
    return await response.json();
  }

  /* Obtiene los detalle la un producto o servicio
    id-> identificador de producto */
  public async detalleVenta(id: any) {
    const url = this.URL + 'ventas/ventasd/' + id;
    const response = await fetch(url);
    return await response.json();
  }

  /* Obtiene los detalle la un producto o servicio
    id-> identificador de producto */
  public async ddetalleVenta(id: any) {
    const url = this.URL + 'ventas/ventasdd/' + id;
    const response = await fetch(url);
    return await response.json();
  }

  /* Obtiene los datos de la sucursal
   * ids-> envia la sucursal */
  public async obtenerSucursal(ids: any) {
    const url = this.URL + 'home/fondoinicial/sucursal/' + ids;
    const response = await fetch(url);
    return await response.json();
  }

  /* Valida si no se tiene un fondo inical
   * ids-> envia la sucursal */
  public async validarFondo(ids: any) {
    const url = this.URL + 'home/fondoinicial/validar/' + ids;
    const response = await fetch(url);
    return await response.json();
  }

  /* Guardar valor del fondo inicial
   * ids-> envia la sucursal
   * fondo-> cantidad */
  public async addFondoInicial(ids: any, fondo: any) {
    const url = this.URL + 'home/fondoinicial/' + ids + '/' + fondo;
    const response = await fetch(url);
    return await response.json();
  }

  /* Actualiza valor del fondo inicial
   * ids-> envia la sucursal
   * fondo-> cantidad */
  public async updateFondoInicial(ids: any, fondoA: any, fondo: any) {
    console.log(fondo);
    const url = this.URL + 'home/fondoinicial/' + ids + '/' + fondoA + '/' + fondo;
    const response = await fetch(url);
    return await response.json();
  }

  /* Guardar datos de la venta
     * venta-> envia datos detalle de la venta
     * idc-> envia id del cliente
     * ids-> envia la sucursal
     * mpago-> envia opcion de metodo de pago
     * descuento-> envia dato de descuento */
  public insertarGuardarVenta(venta: any, idc: any, ids: any, mpago: any, descuento: any) {
    const params = JSON.stringify(venta);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.post(`${this.URL}ventas/agregar/${idc}/${ids}/${mpago}/${descuento}`, params, { 'headers': headers });
  }

  /* Guardar datos de la venta
   * venta-> envia datos detalle de la venta
   * idv-> envia el idventa
   * idc-> envia id del cliente
   * ids-> envia la sucursal
   * mpago-> envia opcion de metodo de pago
   * descuento-> envia dato de descuento */
  public insertarFinalVenta(venta: any, idv: any, idc: any, ids: any, mpago: any, descuento: any) {
    const params = JSON.stringify(venta);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post(`${this.URL}ventas/finalizarhome/${idv}/${idc}/${ids}/${mpago}/${descuento}`, params, { 'headers': headers });
  }

  /* Acceso para la modificacion de datos de la venta */
  public async accesoDatos(usuario: any, password: any) {
    const url = this.URL + 'ventas/acceso/' + usuario + '/' + password;
    const response = await fetch(url);
    return await response.json();
  }

}
