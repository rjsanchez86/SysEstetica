import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { Kardex, Kardex2, Proceso, Sucursal, Almacen, Proveedor, Articulo } from './models/wharehousemov';
import { WharehousemovService } from './service/wharehousemov.service';
import localeEs from '@angular/common/locales/es-MX';
import Swal from 'sweetalert2';
registerLocaleData(localeEs, 'es');
import { LocalService } from './../../../global/encriptacion/local.service';

@Component({
  selector: 'app-wharehousemov',
  templateUrl: './wharehousemov.component.html',
  styleUrls: ['./wharehousemov.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
})
export class WharehousemovComponent implements OnInit {
  fecha: any;
  kardex: Kardex;
  kardex2: Array<Kardex2> = [];
  proceso: Proceso;
  sucursal: Sucursal;
  almacen: Almacen;
  proveedor: Proveedor;
  articulo: Articulo;
  fieldArray: Array<any> = [];
  newAttribute: any = {};
  productos: any;
  ProductoId: 0;
  opciones = '';
  data: any;
  resultado: number;
  usuario: any;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  constructor(private _local: LocalService, private _movimiento: WharehousemovService) { }

  ngOnInit(): void {
    this.usuario = this._local.getJsonValue('user');
    this.usuario = this.usuario[0];
    this.cargar();
  }

  cargar(){
    this.getFecha();
    this.getProcesos();
    this.getSucursal();
    this.getProveedor();
    this.kardex = new Kardex('0', '0', '0', '0', '', this.fecha, '', '', '', '', ' ', '', '');
  }

  addFieldValue() {
    if (this.articulo.cantidad !== 0 || this.articulo.costo !== 0) {
      this.resultado = 0;
      this.fieldArray.push(this.articulo);
      for (let i = 0; i < this.fieldArray.length; i++) {
        this.resultado = this.resultado + parseInt(this.fieldArray[i].cantidad);
      }
      this.articulo = null;
      this.ProductoId = 0;
    } else {
      this.Toast.fire({
        icon: 'error',
        title: 'Favor de Agregar una Cantidad al Producto',
      });
    }
  }

  deleteFieldValue(index: any) {
    this.resultado = 0;
    this.fieldArray.splice(index, 1);
    this.ProductoId = 0;
    for (let i = 0; i < this.fieldArray.length; i++) {
      this.resultado = this.resultado + parseInt(this.fieldArray[i].cantidad);
    }
  }

  getFecha() {
    this.fecha = new Date();
  }

  getProcesos() {
    this._movimiento.obtenerProcesos().subscribe((proceso: any) => {
      this.proceso = proceso.data;
    });
  }

  getSucursal() {
    this._movimiento.obtenerSucursal(this.usuario.sucursal).subscribe((sucursal: any) => {
      this.sucursal = sucursal.data;
    });
  }

  obtenerAlmacen(sucursal: any) {
    this._movimiento.obtenerAlmacen(sucursal).subscribe((almacen: any) => {
      this.almacen = almacen.data;
    });
  }

  getProveedor() {
    this._movimiento.obtenerProveedor().subscribe((proveedor: any) => {
      this.proveedor = proveedor.data;
    });
  }

  getProductos(id: any) {
    this._movimiento.obtenerProductos(id).subscribe((productos: any) => {
      this.productos = productos.data;
    });
  }

  buscar() {
    this.opciones = '';
    if (this.ProductoId !== null) {
      this._movimiento.obtenerArticulo(this.ProductoId).subscribe((articulo: any) => {
        if (articulo.data[0]) {
          this.articulo = articulo.data[0];
          this.articulo.cantidad = 0;
          this.articulo.costo = 0;
        } else {
          this.articulo = null;
          this.Toast.fire({
            icon: 'error',
            title: 'No se encontro el Producto',
          });
        }
      });
    } else {
      this.Toast.fire({
        icon: 'error',
        title: 'Favor de Agregar un  Producto',
      });
    }
  }

  guardar() {
    for (let i = 0; i < this.fieldArray.length; i++) {
      this.kardex2.push({
        idalmacen: this.kardex.idalmacen,
        idproceso: this.kardex.idproceso,
        idarticulo: this.fieldArray[i].idarticulo,
        idproveedor: this.kardex.idproveedor,
        concepto: this.kardex.concepto,
        fecha: '',
        entrada: '',
        salida: '',
        cantidad: this.fieldArray[i].cantidad,
        costo: this.fieldArray[i].costo,
        tipo: this.kardex.tipo,
        folio: this.kardex.folio,
        fcreacion: '',
      });
    }
    this._movimiento.insertarDatosKardex(this.kardex2).subscribe((articulo: any) => {
      this.data = articulo;
      if (this.data.code === 200) {
        this.Toast.fire({
          icon: 'success',
          title: this.data.data
        });
        this.kardex = null;
        this.fieldArray.length = 0;
        this.kardex2.length = 0;
        this.cargar();
      } else if (this.data.code === 400) {
        this.Toast.fire({
          icon: 'error',
          title: this.data.data
        });
      }
    });
  }
}
