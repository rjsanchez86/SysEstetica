import { Component, OnInit, LOCALE_ID, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { HomeService } from './service/home.service';
import { GlobalService } from "./../../global/service/global.service";
import { XsegundoService, valorReloj } from './service/xsegundo.service';
import { Observable } from 'rxjs';
import { Agenda, Ventas, LVentas, Articulo, Merma, Venta, VentaD, Acceso, Sucursal } from './models/home';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import { LocalService } from './../../global/encriptacion/local.service';
import { Router } from '@angular/router';
import localeEs from '@angular/common/locales/es-MX';
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild("finicialModal", { static: true }) finicialModal: TemplateRef<any>;
  public today = Date.now();
  datos$: Observable<valorReloj>;
  hora: number;
  minutos: string;
  dia: string;
  fecha: string;
  ampm: string;
  segundos: string;
  ubicacion: any;
  pais: string;
  icono: string;
  temperatura: number;
  condicion: string;
  tempmax: number;
  tempmin: number;
  humedad: number;
  agenda: Agenda;
  lventas: LVentas;
  ventas: Ventas;
  modalReference = null;
  observacion: string;
  id: any;
  productos: any;
  ProductoId = '';
  articulo: Articulo;
  prod: Articulo;
  personal: any;
  PersonalId = '0';
  comision: 0;
  fieldArray: Array<any> = [];
  contador = 0;
  codigo = '';
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  resultado: number = 0;
  subtotal: number = 0;
  descuento: number = 0;
  total: number = 0;
  iva = 16;
  mpagos: any;
  MPagosId = '0';
  merma: any;
  MermaId: any;
  artmerma: Merma;
  articuloMerma: Array<Merma> = [];
  opcionmerma: any;
  producto: any;
  opciones: string;
  articuloG: Array<any> = [];
  data: any;
  ventadetalle: Array<VentaD> = [];
  venta: Venta;
  letra: any;
  acceso: Acceso;
  opcionacceso: any;
  opcionmodificar: any;
  opcagenda: any;
  opclventas: any;
  opctipo: any;
  opctabla: any;
  opciproducto: any;
  opcfventa: any;
  opcfondo: any;
  usuario: any;
  sucursal: Sucursal;
  SucursalId: '0';
  fondo: 0;
  tblSucursal: any;
  countSucursal: any;

  constructor(private _local: LocalService, private home: HomeService, private segundo: XsegundoService, private global: GlobalService, private modalService: NgbModal, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.usuario = this._local.getJsonValue('user');
    this.usuario = this.usuario[0];
    this.opcagenda = false;
    this.opclventas = false;
    this.opciproducto = false;
    this.opcfventa = true;
    if (this.usuario.puesto == 'ADMINISTRADOR') {
      this.setFondoInicial(this.finicialModal);//Inicia la funcion
    }
    this.setclima();
    this.funcionReloj();
    this.setAgenda();
    this.setVentas();
    this.reporte();
  }

  async setclima() {
    this.pais = 'México';
    const lat = '19.4978';
    const lng = '-99.1269';
    const datosClima = await this.home.obtenerDatosClima(lat, lng);
    console.log(datosClima);
    this.icono = 'http://openweathermap.org/img/wn/' + datosClima.weather[0].icon + '.png';
    this.temperatura = datosClima.main.temp;
    this.condicion = datosClima.weather[0].description;
    this.tempmax = datosClima.main.temp_max;
    this.tempmin = datosClima.main.temp_min;
    this.humedad = datosClima.main.humidity;
  }

  /**Sincronizacion del reloj */
  funcionReloj() {
    this.datos$ = this.segundo.getInfoReloj();
    this.datos$.subscribe(x => {
      this.hora = x.hora;
      this.minutos = x.minutos;
      this.dia = x.diadesemana;
      this.fecha = x.diaymes;
      this.ampm = x.ampm;
      this.segundos = x.segundo;
    });
  }

  /*Insercion de la Caja Chica */
  async setFondoInicial(modal: any) {
    this.modalReference = null;
    const csuc = this.usuario.sucursal.length;
    if (csuc == 1) {
      const datos = await this.home.validarFondo(this.usuario.sucursal);
      if (datos.data[0].datos == '0') {
        this.opcfondo = true;
        const datos = await this.home.obtenerSucursal(this.usuario.sucursal);
        this.sucursal = datos.data;
        this.modalReference = this.modalService.open(modal, { size: 'xl', centered: true, backdrop: 'static', keyboard: false });
      } else {
        this.opcfondo = true;
        this.Toast.fire({
          icon: 'success',
          title: 'Actualmente se tiene un fondo inicial activo\nDebe de cerrar la caja',
        });
      }
    }
  }

  /*Datos que muestra los datos de las sucursales */
  async reporte() {
    const datos = await this.home.obtenerRDiario(this.usuario.sucursal);
    this.tblSucursal = datos.data;
    this.countSucursal = this.tblSucursal.length;
  }

  /** Valida si existe una cantidad de caja chica */
  async validarFondos() {
    const id = this.SucursalId;
    const datos = await this.home.validarFondo(id);
    if (datos.data[0].datos == '0' && datos.data[0].estatus != '0') {
      this.opcfondo = false;
    } else {
      this.opcfondo = true;
      this.Toast.fire({
        icon: 'error',
        title: 'Ya se tiene un fondo inicial para la sucursal, debe de cerrar el fondo del dia',
      });
    }
  }

  /**Guardad la cantidad de la caja chica */
  async guardarFondos() {
    const id = this.SucursalId;
    if (this.fondo != 0) {
      const data = await this.home.addFondoInicial(id, this.fondo);
      if (data.code === 200) {
        this.cerrar();
        this.Toast.fire({
          icon: 'success',
          title: data.data,
        });
      } else if (data.code === 400) {
        this.Toast.fire({
          icon: 'error',
          title: 'Error',
        });
      }
    } else {
      this.Toast.fire({
        icon: 'error',
        title: 'Debe ser mayor a 0',
      });
    }
  }

  /**Actualizar la cantidad de la caja chica */
  async actualizarFondos(sucursal: any) {
    const cantidad = await Swal.fire({
      title: 'Monto a actualizar',
      icon: 'question',
      input: 'number',
      inputLabel: '',
      inputValue: '0',
      inputAttributes: {
        min: '1',
        max: '100000',
        step: '1'
      }
    });
    if (this.fondo != 0) {
      const data = await this.home.updateFondoInicial(sucursal.idsucursal, sucursal.fondo, cantidad.value);
      if (data.code === 200) {
        this.reporte();
        this.Toast.fire({
          icon: 'success',
          title: data.data,
        });
      } else if (data.code === 400) {
        this.Toast.fire({
          icon: 'error',
          title: 'Error',
        });
      }
    } else {
      this.Toast.fire({
        icon: 'error',
        title: 'Debe ser mayor a 0',
      });
    }
  }

  /**Obtiene la informacion de la agenda */
  async setAgenda() {
    const datos = await this.home.obtenerDatosAgenda(this.usuario.sucursal);
    this.agenda = datos.data;
    if (datos.cantidad == '0') {
      this.opcagenda = false;
    } else {
      this.opcagenda = true;
    }
  }

  /**Obttiene la informacion de la venta */
  async setVentas() {
    const datos = await this.home.obtenerDatosVentas(this.usuario.sucursal);
    this.lventas = datos.data;
    if (datos.cantidad == '0') {
      this.opclventas = false;
    } else {
      this.opclventas = true;
    }
  }

  /**Muestra el detalle de la venta */
  async detalleVentas(id: any) {
    const datos = await this.home.obtenerDetalleVentas(id);
    this.ventas = datos.data[0];
  }

  /**Carga los productos para una venta */
  async obtenerProductos(id: any) {
    const datos = await this.home.obtenerDatosProductos(id);
    this.productos = datos.data;
  }

  /**Carga al personal para la venta */
  async cargarPersonal() {
    const datos = await this.home.obtenerDatosPersonal();
    this.personal = datos.data;
  }

  /**Carga la comision acorde al personal y el porcentaje es mostrado */
  async cargarComision(idart: any, idper: any) {
    const datos = await this.home.obtenerDatosComision(idart, idper);
    this.comision = datos.data[0].comision;
    this.articulo.comision = this.comision;
  }

  /**Muestra los tipos de pagos que se tienen en el catalogo */
  async cargarMPagos() {
    const datos = await this.home.obtenerMPagos();
    this.mpagos = datos.data;
  }

  /**Carga el almacen de merma */
  async cargarMerma() {
    const datos = await this.home.obtenerDatosMerma();
    this.merma = datos.data;
  }

  /**Carga el detalle de la venta */
  async cargarDVenta(id: any) {
    const datos = await this.home.detalleVenta(id);
    this.ventadetalle = datos.data;
  }


  /**funcion para mostrar y cargar los elementos de un modal */
  /**accion => tipo de accion */
  /**id=> valor o valores que se pueden obtener */
  /**modal=> nombre de la modal a cargar */
  ver(accion: any, id: any, modal: any) {
    switch (accion) {
      case 'actCita':
        this.id = id;
        break;
      case 'actVenta':
        this.opctipo = true;
        this.opctabla = true;
        this.detalleVentas(id.idagenda);
        this.obtenerProductos(id.idsucursal);
        this.cargarMPagos();
        break;
    }
    this.modalReference = this.modalService.open(modal, { windowClass: 'my-class', centered: true });
  }

  /**funcion para mostrar y cargar los elementos de un modal */
  /**accion => tipo de accion */
  /**id=> valor o valores que se pueden obtener */
  /**modal=> nombre de la modal a cargar */
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

  /**Accion para hace cambio a la venta */
  mProducto(producto: any, opcion: any) {
    this.acceso = new Acceso('', '');
    this.opcionacceso = opcion;
    this.opctipo = false;
    this.opctabla = false;
    this.opciproducto = true;
    this.prod = producto;
  }

  /**Acceso para poder cambiar a la venta */
  async acceder() {
    if (this.acceso.usuario != '' && this.acceso.password != '') {
      const permiso = await this.home.accesoDatos(this.acceso.usuario, this.acceso.password);
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

  /**Guarda la modificacion de la venta */
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

  /**Cancela el acceso para no hacer ningun cambio a la venta */
  cancelaracceso() {
    this.opcionacceso = false;
    this.opctipo = true;
    this.opctabla = true;
    this.opciproducto = false;
  }

  /**Cierra la ventana modal abierta */
  cerrar() {
    this.modalReference.close();
  }

  /**Cierra la ventana modal de la venta y quita los detalles*/
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

  /**Obtiene los datos de la comicion del select*/
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

  /**Actualiza las cita seleccionada */
  async actualizar(id: any, status: any) {
    let data: any;
    let cadena: any;
    switch (status) {
      case 'Atendiendo':
        data = await this.home.actualizarAgenda(id);
        cadena = ' Actualizada';
        break;
      case 'Cancelada':
        data = await this.home.canceladaAgenda(id, this.observacion);
        cadena = ' Cancelada';
        this.cerrar();
        break;
    }
    if (data.code === 200) {
      this.Toast.fire({
        icon: 'success',
        title: 'Cita ' + cadena,
      });
    } else if (data.code === 400) {
      this.Toast.fire({
        icon: 'error',
        title: 'Error',
      });
    }
    this.setAgenda();
    this.setVentas();
  }

  /**Busca un producto en particular */
  async buscar(idsucursal: any) {
    let data: any;
    if (this.ProductoId !== '') {
      data = await this.home.obtenerArticulo(this.ProductoId, idsucursal);
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

  /**Añade los datos de la busqueda del producto a la tabla venta */
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

  /**elimina un dato de la tabla venta */
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

  /**Suma los detalles de la venta */
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
  }

  /**Elimina el detalle del servicio */
  eliminarMerma(index: any) {
    this.articuloMerma.splice(index, 1);
  }

  /**Actualiza la cantidad de merma a usar en un  servicio */
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

  /**Actualiza los datos */
  mermaver(datos: any, opcion: any) {
    this.cargarMerma();
    this.producto = datos;
    this.opcionmerma = opcion;
    this.opctipo = false;
    this.opctabla = false;
    this.opciproducto = true;
  }

  /**Busca los productos de una merma */
  async buscarMerma() {
    this.opciones = '';
    if (this.MermaId !== '') {
      const datos = await this.home.obtenerMerma(this.MermaId);
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

  /**Guarda la merma que se uso */
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

  /*Guarda la venta sin finalizar*/
  guardarVenta() {
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

    this.home.insertarGuardarVenta(this.articuloG, this.ventas.idcliente, this.ventas.idsucursal, this.MPagosId, this.descuento).subscribe((data: any) => {
      this.data = data;
      if (this.data.code === 200) {
        this.Toast.fire({
          icon: 'success',
          title: this.data.data,
        });
        this.cerrarVentas();
      } else if (this.data.code === 400) {
        this.Toast.fire({
          icon: 'error',
          title: this.data.data,
        });
      }
    });
  }

  /*Finaliza la venta*/
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
    this.home.insertarFinalVenta(this.articuloG, this.ventas.idventa, this.ventas.idcliente, this.ventas.idsucursal, this.MPagosId, this.descuento).subscribe((data: any) => {
      this.data = data;
      if (this.data.code === 200) {
        this.Toast.fire({
          icon: 'success',
          title: this.data.data,
        });
        this.setAgenda();
        this.setVentas();
        this.cerrarVentas();
      } else if (this.data.code === 400) {
        this.Toast.fire({
          icon: 'error',
          title: this.data.data,
        });
      }
    });
  }
  /**Sale del sistema */
  salir() {
    this._local.clearToken();
    this.router.navigate(['/login']);
  }
}
