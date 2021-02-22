import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { Sucursal, Almacen, AlmacenM, Productos, Producto, addProducto } from './models/wharehousedec';
import { WharehousedecService } from './service/wharehousedec.service';
import localeEs from '@angular/common/locales/es-MX';
import Swal from 'sweetalert2';
registerLocaleData(localeEs, 'es');
import { LocalService } from './../../../global/encriptacion/local.service';

@Component({
  selector: 'app-wharehousedec',
  templateUrl: './wharehousedec.component.html',
  styleUrls: ['./wharehousedec.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
})
export class WharehousedecComponent implements OnInit {
  sucursal: Sucursal;
  almacen: Almacen;
  almacenm: AlmacenM;
  ids: any;
  ida: any;
  idp: any;
  idm: any;
  productos: Productos;
  ProductoId: any;
  producto: Producto;
  productom: Producto;
  addproducto: addProducto;
  data: any;
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

  constructor(private _local: LocalService, private _almamerma: WharehousedecService) { }

  ngOnInit(): void {
    this.usuario = this._local.getJsonValue('user');
    this.usuario = this.usuario[0];
    this.carga();
  }

  carga() {
    this.getSucursal();
  }

  getSucursal() {
    this._almamerma.obtenerSucursal(this.usuario.sucursal).subscribe((sucursal: any) => {
      this.sucursal = sucursal.data;
    });
  }

  obtenerAlmacen(id: any) {
    this.ids = id;
    this._almamerma.obtenerAlmacen(id).subscribe((almacen: any) => {
      this.almacen = almacen.data;
    });
    this._almamerma.obtenerAlmacenMerma(id).subscribe((almacen: any) => {
      this.almacenm = almacen.data;
    });
  }

  obtenerProducto(ida: any) {
    this.ida = ida;
    this._almamerma.obtenerProductos(this.ids, ida).subscribe((productos: any) => {
      this.productos = productos.data;
    });
  }

  obtenerProductoM(idm: any) {
    this.idm = idm;
  }

  articuloSel(event: any) {
    let cadena: any[];
    if (typeof event != 'undefined') {
      this.idp = event.idarticulo;
      this._almamerma.obtenerProducto(this.ids, this.ida, this.idp).subscribe((producto: any) => {
        this.producto = producto.data;
        cadena = this.producto[0].nombre.split('-');
        this.producto[0].nombre = cadena[1];
        this.producto[0].codigobarras = cadena[0];
      });
      this._almamerma.obtenerProductoM(this.ids, this.idm, this.idp).subscribe((productom: any) => {
        if (typeof productom.data[0] != 'undefined') {
          this.productom = productom.data;
          cadena = this.productom[0].nombre.split('-');
          this.productom[0].nombre = cadena[1];
          this.productom[0].codigobarras = cadena[0];
        }
      });
    }
  }

  async enviar(prod: any) {
    const { value: accept } = await Swal.fire({
      title: '¿Deseas agregar el producto?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    });
    if (accept) {
      this.addproducto = new addProducto(this.ids, this.ida, this.idm, prod.idarticulo, prod.cantpresentacion);
      this._almamerma.insertarProducto(this.addproducto).subscribe((data: any) => {
        this.data = data;
        if (this.data.code === 200) {
          this.Toast.fire({
            icon: 'success',
            title: this.data.data,
          });
          this.carga();
          this.almacen = null;
          this.almacenm = null;
          this.producto = null;
          this.productom = null;
          this.ProductoId = 0;
        } else if (this.data.code === 400) {
          this.Toast.fire({
            icon: 'error',
            title: this.data.data,
          });
        }
      });
    } else {
      this.Toast.fire({
        icon: 'error',
        title: 'Proceso Cancelado',
      });
      this.carga();
      this.almacen = null;
      this.almacenm = null;
      this.producto = null;
      this.productom = null;
      this.ProductoId = 0;
    }
  }
}
