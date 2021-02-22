import { Component, LOCALE_ID, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ListsalesService } from './service/listsales.service';
import { LVentas, Ventas, Venta, VentaD, Articulo, Acceso1, Merma } from './models/listsales';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import localeEs from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { LocalService } from './../../../global/encriptacion/local.service';
import { GlobalService } from "./../../../global/service/global.service";
registerLocaleData(localeEs, 'es-MX');

@Component({
  selector: 'app-listsales',
  templateUrl: './listsales.component.html',
  providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }],
  styleUrls: ['./listsales.component.scss']
})
export class ListsalesComponent implements OnDestroy, OnInit {
  public today = Date.now();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger = new Subject();
  lventas: LVentas;
  ventas: Ventas;
  venta: Venta;
  letra: any;
  modalReference = null;
  ventadetalle: Array<VentaD> = [];
  id: any;
  articulo: Articulo;
  opcionacceso: any;
  opcionmodificar: any;
  opcagenda: any;
  opclventas: any;
  opctipo: any;
  opctabla: any;
  opciproducto: any;
  opcfventa: any;
  productos: any;
  ProductoId = '';
  mpagos: any;
  MPagosId = '0';
  personal: any;
  PersonalId = '0';
  contador = 0;
  fieldArray: Array<any> = [];
  comision: 0;
  codigo = '';
  resultado: number = 0;
  subtotal: number = 0;
  descuento: number = 0;
  total: number = 0;
  iva = 16;
  producto: any;
  opcionmerma: any;
  merma: any;
  MermaId: any;
  acceso: Acceso1;
  prod: Articulo;
  articuloMerma: Array<Merma> = [];
  opciones: string;
  artmerma: Merma;
  articuloG: Array<any> = [];
  data: any;
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
  usuario: any;

  constructor(private _local: LocalService, private _ventas: ListsalesService, private global: GlobalService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refrescarTabla();
  }

  refrescarTabla() {
    this.usuario = this._local.getJsonValue('user');
    this.usuario = this.usuario[0];
    this.opcagenda = false;
    this.opclventas = false;
    this.opciproducto = false;
    this.opcfventa = true;
    this.cargarDTOpciones();
    this.cargarVentas();
  }

  cargarDTOpciones() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json',
      },
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'copyHtml5',
          text: '<i class="feather icon-copy"></i>',
          titleAttr: 'Copiar'
        },
        {
          extend: 'excelHtml5',
          text: '<i class="feather icon-file-text"></i>',
          autoFilter: true,
          titleAttr: 'Excel',

        },
        {
          extend: 'print',
          text: '<i class="feather icon-printer"></i>',
          titleAttr: 'Imprimir'
        }
      ],
      order: [[0, 'desc']],
      responsive: false,
    };
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  cargarVentas() {
    this._ventas.obtenerVentas(this.usuario.sucursal).subscribe((ventasl: any) => {
      this.lventas = ventasl.data;
      this.rerender();
    });
  }

  rerender(): void {
    if (this.dtElement && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
    }
    setTimeout(() => {
      this.dtTrigger.next();
    });
  }

  ver(accion: any, id: any, modal: any) {
    switch (accion) {
      case 'actCita':
        this.id = id;
        break;
      case 'actVenta':
        this.opctipo = true;
        this.opctabla = true;
        this.detalleVentas(id.idagenda);
        break;
    }
    this.modalReference = this.modalService.open(modal, { windowClass: 'my-class', centered: true });
  }

  ver2(accion: any, id: any, modal: any) {
    switch (accion) {
      case 'detVenta':
        this.venta = id;
        this.letra = this.global.numeroALetras(this.venta.total, {
          plural: 'PESOS',
          singular: 'PESOS'
        });
        this.cargarDVenta(id.idventa);
        break;

    }
    this.modalReference = this.modalService.open(modal, { size: 'xl', centered: true });
  }

  async cargarDVenta(id: any) {
    const datos = await this._ventas.detalleVenta(id);
    this.ventadetalle = datos.data;
  }

  async detalleVentas(id: any) {
    const datos = await this._ventas.obtenerDetalleVentas(id);
    this.ventas = datos.data[0];
  }

  async obtenerProductos(id: any) {
    const datos = await this._ventas.obtenerDatosProductos(id);
    this.productos = datos.data;
  }

  async cargarMPagos() {
    const datos = await this._ventas.obtenerMPagos();
    this.mpagos = datos.data;
  }

  async cargarPersonal() {
    const datos = await this._ventas.obtenerDatosPersonal();
    this.personal = datos.data;
  }

  async buscar(idsucursal: any) {
    let data: any;
    if (this.ProductoId !== '') {
      data = await this._ventas.obtenerArticulo(this.ProductoId, idsucursal);
      if (data.data[0]) {
        this.articulo = data.data[0];
        this.articulo.cantidadusar = 0;
        this.cargarPersonal();
        this.opctipo = false;
        this.opctabla = false;
      } else {
        this.articulo = null;
        this.Toast.fire({
          icon: 'error',
          title: 'No se encontro ningun producto',
        });
      }
    } else {
      this.Toast.fire({
        icon: 'error',
        title: 'Favor de Agregar un Producto',
      });
    }
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
      this.articulo = null;
      this.codigo = '';
      this.PersonalId = '';
      this.ProductoId = '';
      this.comision = 0;
      this.contador++;
      this.sumar();
      this.opctipo = true;
      this.opctabla = true;
      if (this.fieldArray.length == 0) {
        this.opcfventa = true;
      } else {
        this.opcfventa = false;
      }
    } else {
      this.Toast.fire({
        icon: 'error',
        title: 'Favor de llenar todos los campos',
      });
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
    this.total = this.subtotal - desc;
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

  async cargarComision(idart: any, idper: any) {
    const datos = await this._ventas.obtenerDatosComision(idart, idper);
    this.comision = datos.data[0].comision;
    this.articulo.comision = this.comision;
  }

  mermaver(datos: any, opcion: any) {
    this.cargarMerma();
    this.producto = datos;
    this.opcionmerma = opcion;
    this.opctipo = false;
    this.opctabla = false;
    this.opciproducto = true;
  }

  async cargarMerma() {
    const datos = await this._ventas.obtenerDatosMerma();
    this.merma = datos.data;
  }

  mProducto(producto: any, opcion: any) {
    this.acceso = new Acceso1('', '');
    this.opcionacceso = opcion;
    this.opctipo = false;
    this.opctabla = false;
    this.opciproducto = true;
    this.prod = producto;
  }

  deleteFieldValue(index: any, id: any) {
    this.fieldArray.splice(index, 1);
    for (let i = 0; i < this.articuloMerma.length; i++) {
      if (this.articuloMerma[i].id === id) {
        this.articuloMerma.splice(i, 1);
      }
    }
    if (this.fieldArray.length == 0) {
      this.opcfventa = true;
    } else {
      this.opcfventa = false;
    }
    this.codigo = '';
    this.sumar();
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

  eliminarMerma(index: any) {
    this.articuloMerma.splice(index, 1);
  }

  async acceder() {
    if (this.acceso.usuario != '' && this.acceso.password != '') {
      const permiso = await this._ventas.accesoDatos(this.acceso.usuario, this.acceso.password);
      const validar = permiso.data[0].acceso;
      if (validar == 'autorizado') {
        this.opcionacceso = false;
        this.opcionmodificar = true;
        this.opctipo = false;
        this.opctabla = false;
        this.opciproducto = true;
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

  cancelaracceso() {
    this.opcionacceso = false;
    this.opctipo = true;
    this.opctabla = true;
    this.opciproducto = false;
  }

  guardarModificacion() {
    if (this.prod.comision <= 50) {
      const indice = this.fieldArray.findIndex(productos => productos.id === this.prod.id);
      this.fieldArray[indice].comision = this.prod.comision;
      this.fieldArray[indice].importe = this.prod.importe;
      this.fieldArray[indice].total = this.prod.importe;
      this.sumar();
      this.opcionmodificar = false;
      this.opctipo = true;
      this.opctabla = true;
      this.opciproducto = false;
    } else {
      this.Toast.fire({
        icon: 'error',
        title: 'No se puede tener una comision mayor a 50',
      });
    }
  }

  async buscarMerma() {
    this.opciones = '';
    if (this.MermaId !== '') {
      const datos = await this._ventas.obtenerMerma(this.MermaId);
      if (datos.data[0]) {
        this.artmerma = datos.data[0];
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
    } else {
      this.Toast.fire({
        icon: 'error',
        title: 'Favor de Agregar un Codigo de Barras del Producto',
      });
    }
  }

  guardarMerma() {
    if (this.artmerma.cantidadusar !== 0 && this.artmerma.cantidadusar <= this.artmerma.cantidad) {
      this.artmerma.id = this.producto.id;
      this.articuloMerma.push(this.artmerma);
      this.artmerma = null;
      this.MermaId = 0;
      this.opcionmerma = false;
      this.opctipo = true;
      this.opctabla = true;
      this.opciproducto = false;
    } else {
      this.Toast.fire({
        icon: 'error',
        title: 'Favor de verificar la cantidad',
      });
    }
  }

  cerrarVentas() {
    this.modalReference.close();
    for (let i = 0; i < this.fieldArray.length; i++) {
      this.fieldArray.splice(i, 1);

      for (let j = 0; j < this.articuloMerma.length; j++) {
        this.articuloMerma.splice(j, 1);
      }
    }
    this.sumar();
  }

  finalizarVenta() {
    for (let i = 0; i < this.fieldArray.length; i++) {
      this.articuloG[i] = this.fieldArray[i];
      this.articuloG[i].nombre = this.fieldArray[i].nombre.trim();
      for (let j = 0; j < this.articuloMerma.length; j++) {
        if (this.fieldArray[i].id === this.articuloMerma[j].id) {
          this.articuloG[i][j] = this.articuloMerma[j];
        }
      }
    }
    this._ventas.insertarFinalVenta(this.articuloG, this.ventas.idcliente, this.ventas.idsucursal, this.MPagosId, this.descuento).subscribe((data: any) => {
      this.data = data;
      if (this.data.code === 200) {
        this.Toast.fire({
          icon: 'success',
          title: this.data.data,
        });

        this.refrescarTabla();
        this.cerrarVentas();
      } else if (this.data.code === 400) {
        this.Toast.fire({
          icon: 'error',
          title: this.data.data,
        });
      }
    });
  }

  cerrar() {
    this.modalReference.close();
  }
}
