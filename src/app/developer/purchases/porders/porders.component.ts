import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { PordersService } from './services/porders.service';
import { Sucursal, Almacen, Proveedor, Articulo } from './models/porders';
import { LocalService } from './../../../global/encriptacion/local.service';
import localeEs from '@angular/common/locales/es-MX';
import Swal from 'sweetalert2';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-porders',
  templateUrl: './porders.component.html',
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  styleUrls: ['./porders.component.scss']
})
export class PordersComponent implements OnInit {
  sucursal: Sucursal;
  almacen: Almacen;
  proveedor: Proveedor;
  usuario: any;
  productos: any;
  ProductoId: 0;
  articulo: Articulo;
  fieldArray: Array<any> = [];
  newAttribute: any = {};
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
  data: any;

  constructor(private _local: LocalService, private _pordenes: PordersService) { }

  ngOnInit(): void {
    this.usuario = this._local.getJsonValue('user');
    this.usuario = this.usuario[0];
    this.cargar();
  }

  cargar() {
    this.getSucursal();
    this.getProveedor();
  }

  getSucursal() {
    this._pordenes.obtenerSucursal(this.usuario.sucursal).subscribe((sucursal: any) => {
      this.sucursal = sucursal.data;
    });
  }

  getProveedor() {
    this._pordenes.obtenerProveedor().subscribe((proveedor: any) => {
      this.proveedor = proveedor.data;
    });
  }

  getProductos(id: any) {
    this._pordenes.obtenerProductos(id).subscribe((productos: any) => {
      this.productos = productos.data;
    });
  }


  buscar() {
    if (this.ProductoId !== null) {
      this._pordenes.obtenerArticulo(this.ProductoId, this.usuario.sucursal).subscribe((articulo: any) => {
        if (articulo.data[0]) {
          this.articulo = articulo.data[0];
          this.articulo.cantidad = 0;
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

  addFieldValue() {
    if (this.articulo.cantidad !== 0) {
      this.fieldArray.push(this.articulo);
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
    this.fieldArray.splice(index, 1);
    this.ProductoId = 0;
  }

  guardar() {
    let totalcantidad = 0;
    let totalcosto = 0;
    for (let i = 0; i < this.fieldArray.length; i++) {
      totalcantidad += this.fieldArray[i].cantidad;
      totalcosto += this.fieldArray[i].costo;
    }
    this._pordenes.insertarOrden(this.usuario.id, this.usuario.sucursal, this.fieldArray).subscribe((data: any) => {
      this.data = data;

      if (this.data.code === 200) {
        this.Toast.fire({
          icon: 'success',
          title: this.data.data,
        });
        this.ProductoId = 0;
        this.cargar();
        this.fieldArray.length = 0;
      } else if (this.data.code === 400) {
        this.Toast.fire({
          icon: 'error',
          title: this.data.data,
        });
      }
    });
  }


}
