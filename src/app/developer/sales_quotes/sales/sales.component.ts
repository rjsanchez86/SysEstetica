
import { Component, LOCALE_ID, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SalesService } from './service/sales.service';
import { GlobalService } from "./../../../global/service/global.service";
import { Cliente, Articulo, Merma, Sucursal, Venta, VentaD, Acceso } from './models/sales';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-MX';
registerLocaleData(localeEs, 'es');
import { LocalService } from './../../../global/encriptacion/local.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  @ViewChild("ventadModal", { static: false }) ventadModal: TemplateRef<any>;
  public today = Date.now();
  cliente: Cliente;
  clientes: any;
  ClienteId = '0';
  cli: any = [];
  sucursal: Sucursal;
  personal: any;
  PersonalId = '0';
  productos: any;
  ProductoId = '';
  producto: any;
  pro: any = [];
  mpagos: any;
  MPagosId = '0';
  mpa: any = [];
  articulo: Articulo;
  modalReference = null;
  data: any;
  comision: 0;
  codigo = '';
  opciones = '';
  fieldArray: Array<any> = [];
  resultado = 0.0;
  descuento = 0;
  subtotal = 0.0;
  iva = 16;
  total = 0;
  merma: any;
  MermaId: any;
  artmerma: Merma;
  articuloMerma: Array<Merma> = [];
  contador = 0;
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
  articuloG: Array<any> = [];
  idSucursal: any;
  ventadetalle: Array<VentaD> = [];
  ventas: Venta;
  letra: any;
  acceso: Acceso;
  usuario: any;
  opcion: any;
  opcionguardar: any;

  constructor(private _local: LocalService, private _sales: SalesService, private global: GlobalService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.usuario = this._local.getJsonValue('user');
    this.usuario = this.usuario[0];
    this.cargarClientes();
    this.cargarMPagos();
    this.cargarSucursal();
    this.opcion = false;
    this.opcionguardar = true;
  }

  cargarPersonal() {
    this._sales.obtenerDatosPersonal().subscribe((personal: any) => {
      this.personal = personal.data;
    });
  }

  cargarClientes() {
    this._sales.obtenerDatosClientes().subscribe((client: any) => {
      this.clientes = client.data;
    });
  }

  cargarProductos(id: any) {
    this.idSucursal = id;
    this._sales.obtenerDatosProductos(id).subscribe((productos: any) => {
      this.productos = productos.data;
      this.PersonalId = '';
      for (let i = 0; i < this.fieldArray.length; i++) {
        this.fieldArray.splice(i, 1);
        for (let j = 0; j < this.articuloMerma.length; j++) {
          this.articuloMerma.splice(j, 1);
        }
      }
    });
  }

  cargarComision(idart: any, idper: any) {
    this._sales.obtenerDatosComision(idart, idper).subscribe((comision: any) => {
      this.comision = comision.data[0].comision;
      this.articulo.comision = this.comision;
    });
  }

  cargarMerma() {
    this._sales.obtenerDatosMerma(this.idSucursal).subscribe((merma: any) => {
      this.merma = merma.data;
    });
  }

  cargarMPagos() {
    this._sales.obtenerMPagos().subscribe((mpagos: any) => {
      this.mpagos = mpagos.data;
    });
  }

  cargarSucursal() {
    this._sales.obtenerSucursal(this.usuario.sucursal).subscribe((sucursal: any) => {
      this.sucursal = sucursal.data;
    });
  }

  async cargarDVenta(id: any) {
    const datos = await this._sales.detalleVenta(id);
    this.ventadetalle = datos.data;
  }

  ver(modal: any, tipo: any, datos: any) {
    switch (tipo) {
      case 'cliente':
        this.cliente = new Cliente('', '', '', '', '');
        break;
      case 'producto':
        this.cargarMerma();
        this.producto = datos;
        break;
      case 'dventa':
        this.cargarDVenta(datos);
        break;
      case 'mproducto':
        this.producto = datos;
        break;
      case 'acceso':
        this.acceso = new Acceso('', '');
        this.producto = datos;
        break;
    }
    this.modalReference = this.modalService.open(modal, { size: 'xl', centered: true, });
  }

  async acceder(modal: any) {
    if (this.acceso.usuario != '' && this.acceso.password != '') {
      const permiso = await this._sales.accesoDatos(this.acceso.usuario, this.acceso.password);
      const validar = permiso.data[0].acceso;
      if (validar == 'autorizado') {
        this.cerrar();
        this.modalReference = this.modalService.open(modal, { size: 'xl', centered: true, });
      } else {
        this.Toast.fire({
          icon: 'error',
          title: 'Validar Datos Por Favor',
        });
      }
    } else {
      this.Toast.fire({
        icon: 'error',
        title: 'Favor de llenar todos los campos',
      });
    }
  }

  guardarModificacion() {
    if (this.producto.comision <= 50) {
      const indice = this.fieldArray.findIndex(productos => productos.id === this.producto.id);
      this.fieldArray[indice].comision = this.producto.comision;
      this.fieldArray[indice].importe = this.producto.importe;
      this.fieldArray[indice].total = this.producto.importe;
      this.sumar();
      this.cerrar();
    } else {
      this.Toast.fire({
        icon: 'error',
        title: 'No se puede tener una comision mayor a 50',
      });
    }
  }

  cerrar() {
    this.modalReference.close();
  }

  limpiar() {
    this.articulo = null;
  }

  addFieldValue() {
    if (this.articulo.cantidadusar !== 0 && this.PersonalId !== '0') {
      let nombre = this.articulo.nombre.split('-');
      this.articulo.total = this.articulo.cantidadusar * this.articulo.importe;
      this.articulo.nombre = nombre[1].trim();
      this.articulo.tipo = nombre[0].trim();
      this.articulo.id = this.contador;
      this.articulo.idpersonal = this.PersonalId;
      this.fieldArray.push(this.articulo);
      this.sumar();
      this.articulo = new Articulo(0, '', '', '', '', '', '', 0, '', '', 0, 0, 0, 0, '', '', '');
      this.codigo = '';
      this.PersonalId = '';
      this.ProductoId = '';
      this.comision = 0;
      this.contador++;
      this.cerrar();
    } else {
      this.Toast.fire({
        icon: 'error',
        title: 'Favor de llenar todos los campos',
      });
    }
  }

  deleteFieldValue(index: any, id: any) {
    this.fieldArray.splice(index, 1);
    for (let i = 0; i < this.articuloMerma.length; i++) {
      if (this.articuloMerma[i].id === id) {
        this.articuloMerma.splice(i, 1);
      }
    }
    this.codigo = '';
    this.sumar();
  }

  obtenerDato($event: any, tipo: any) {
    switch (tipo) {
      case 'comision':
        var persona = $event.nombre;
        persona = persona.split('-');
        persona = persona[1];
        this.articulo.personal = persona.trim();
        this.cargarComision(this.ProductoId, $event.idpersonal);
        break;
    }
  }

  sumar() {
    this.resultado = 0;
    let desc = 0;
    for (let i = 0; i < this.fieldArray.length; i++) {
      this.resultado = this.resultado + parseFloat(this.fieldArray[i].total);
    }
    this.subtotal = this.resultado;
    desc = (this.descuento * this.subtotal) / 100;
    //this.total = (this.subtotal * (1.16));
    //this.total = this.total - (desc * (1.16));
    this.total = this.subtotal - desc;
    if (this.total == 0) {
      this.opcion = false;
    } else {
      this.opcion = true;
    }
  }

  buscar(modal: any) {
    this.opciones = '';
    if (this.ProductoId !== '') {
      this._sales.obtenerArticulo(this.ProductoId, this.idSucursal).subscribe((articulo: any) => {
        if (articulo.data[0]) {
          this.articulo = articulo.data[0];
          this.articulo.cantidadusar = 0;
          this.cargarPersonal();
          this.modalReference = this.modalService.open(modal, { size: 'xl', centered: true, });
        } else {
          this.articulo = null;
          this.Toast.fire({
            icon: 'error',
            title: 'No se encontro ningun producto',
          });

        }
      });
    } else {
      this.Toast.fire({
        icon: 'error',
        title: 'Favor de Agregar un Producto',
      });
    }
  }

  buscarMerma() {
    this.opciones = '';
    if (this.MermaId !== '') {
      this._sales.obtenerMerma(this.MermaId).subscribe((artmerma: any) => {
        if (artmerma.data[0]) {
          this.artmerma = artmerma.data[0];

          for (let i = 0; i < this.articuloMerma.length; i++) {
            if (this.artmerma.idarticulo === this.articuloMerma[i].idarticulo) {
              this.artmerma.cantidad -= this.articuloMerma[i].cantidadusar;
            }
          }
          this.artmerma.cantidadusar = 0;
        } else {
          this.artmerma = null;
          this.Toast.fire({
            icon: 'error',
            title: 'No se encontro ningun producto',
          });
        }
      });
    } else {
      this.Toast.fire({
        icon: 'error',
        title: 'Favor de Agregar un Codigo de Barras del Producto',
      });
    }
  }

  guardarCliente() {
    this._sales.insertarDatosCliente(this.cliente).subscribe((data: any) => {
      this.data = data;
      if (this.data.code === 200) {
        this.Toast.fire({
          icon: 'success',
          title: this.data.data,
        });
        this.cli = [];
        this.cargarClientes();
        this.cerrar();
      } else if (this.data.code === 400) {
        this.Toast.fire({
          icon: 'error',
          title: this.data.data,
        });
      }
    });
  }

  guardarMerma() {
    if (this.artmerma.cantidadusar !== 0 && this.artmerma.cantidadusar <= this.artmerma.cantidad) {
      this.artmerma.id = this.producto.id;
      this.articuloMerma.push(this.artmerma);
      this.artmerma = null;
      this.MermaId = 0;
      this.cerrar();
    } else {
      this.Toast.fire({
        icon: 'error',
        title: 'Favor de verificar la cantidad',
      });
    }
  }

  eliminarMerma(index: any) {
    this.articuloMerma.splice(index, 1);
  }

  async actualizarMerma(index: any) {
    const i = index;
    const maxi = this.articuloMerma[i].cantidad as any;
    const uso = this.articuloMerma[i].cantidadusar as any;
    const cantidad = await Swal.fire({
      title: 'Cantidad usada para el servicio',
      icon: 'question',
      input: 'number',
      inputLabel: '',
      inputValue: uso,
      inputAttributes: {
        min: '1',
        max: maxi,
        step: '1'
      }
    });
    this.articuloMerma[i].cantidadusar = cantidad.value;
  }

  guardarVenta() {
    for (let i = 0; i < this.fieldArray.length; i++) {
      this.articuloG[i] = this.fieldArray[i];
      this.articuloG[i].nombre = this.fieldArray[i].nombre.trim();
      for (let j = 0; j < this.articuloMerma.length; j++) {
        if (this.fieldArray[i].id === this.articuloMerma[j].id) {
          this.articuloG[i][j] = this.articuloMerma[j];
        }
      }
    }
    this._sales.insertarGuardarVenta(this.articuloG, this.ClienteId, this.idSucursal, this.MPagosId, this.descuento).subscribe((data: any) => {
      this.data = data;
      if (this.data.code === 200) {
        this.Toast.fire({
          icon: 'success',
          title: this.data.data,
        });
        this.cli = [];
        this.cargarClientes();
        this.cerrar();
      } else if (this.data.code === 400) {
        this.Toast.fire({
          icon: 'error',
          title: this.data.data,
        });
      }
    });
    for (let i = 0; i < this.fieldArray.length; i++) {
      this.fieldArray.splice(i, 1);

      for (let j = 0; j < this.articuloMerma.length; j++) {
        this.articuloMerma.splice(j, 1);
      }
    }
  }

  habilitarboton() {
    if (this.MPagosId != '0' && this.opcion == true) {
      this.opcionguardar = false;
    } else {
      this.opcionguardar = true;
    }
  }

  finalizarVenta() {
    for (let i = 0; i < this.fieldArray.length; i++) {
      // this.articuloG[i] = new Array();
      this.articuloG[i] = this.fieldArray[i];
      this.articuloG[i].nombre = this.fieldArray[i].nombre.trim();

      for (let j = 0; j < this.articuloMerma.length; j++) {
        if (this.fieldArray[i].id === this.articuloMerma[j].id) {
          this.articuloG[i][j] = this.articuloMerma[j];
        }
      }
    }
    this._sales.insertarFinalVenta(this.articuloG, this.ClienteId, this.idSucursal, this.MPagosId, this.descuento).subscribe((data: any) => {
      this.data = data;
      if (this.data.code === 200) {
        this.Toast.fire({
          icon: 'success',
          title: this.data.data,
        });
        this.cli = [];
        this.ClienteId = '0';
        this.MPagosId = '0';
        this.cargarClientes();
        this.cerrar();
        this.borrar();
        this.opcionguardar = true;
        this.ventas = new Venta(this.data.subtotal, this.data.descuentos, this.data.impuestos, this.data.total, this.data.cliente, this.data.folio, this.data.fhentrada, this.data.fhentrada);
        this.letra = this.global.numeroALetras(this.ventas.total, {
          plural: 'PESOS',
          singular: 'PESOS',
        });
        this.ver(this.ventadModal, 'dventa', this.data.idventas);
      } else if (this.data.code === 400) {
        this.Toast.fire({
          icon: 'error',
          title: this.data.data,
        });
      }
    });
  }

  borrar() {
    for (let i = 0; i < this.fieldArray.length; i++) {
      this.fieldArray.splice(i, 1);
      for (let j = 0; j < this.articuloMerma.length; j++) {
        this.articuloMerma.splice(j, 1);
      }
    }
    this.sumar();
  }

  cerrarVenta() {
    this.ventas = null;
    this.cerrar();
  }
}
