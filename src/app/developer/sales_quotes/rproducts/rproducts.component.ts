import { Component, LOCALE_ID, OnInit} from '@angular/core';
import { LocalService } from './../../../global/encriptacion/local.service';
import { GlobalService } from "./../../../global/service/global.service";
import { Sucursal, Ticket, DTicket, Devoluciones, Venta, VentaD } from './models/rproducts';
import { RproductsService } from './service/rproducts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import localeEs from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es-MX');

@Component({
  selector: 'app-rproducts',
  templateUrl: './rproducts.component.html',
  providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }],
  styleUrls: ['./rproducts.component.scss']
})
export class RproductsComponent implements OnInit {
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger = new Subject();
  usuario: any;
  sucursal: Sucursal;
  venta: Venta;
  ventadetalle: Array<VentaD> = [];
  idSucursal: any;
  ticket: Ticket;
  TicketID: any;
  dticket: DTicket;
  data: any;
  letra: any;
  modalReference = null;
  devoluciones: Devoluciones;
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

  constructor(private _local: LocalService, private _rproductos: RproductsService, private global: GlobalService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.usuario = this._local.getJsonValue('user');
    this.usuario = this.usuario[0];
    this.cargarSucursal();
    this.refrescarTabla();
  }

  refrescarTabla() {
    this.cargarDTOpciones();
    this.cargarDevoluciones();
  }

  cargarDTOpciones() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json',
      },
      processing: true,
      order: [[0, 'desc']],
      responsive: false,
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'copyHtml5',
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6]
          }
        },
        {
          extend: 'excelHtml5',
          autoFilter: true,
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6]
          }
        },
        {
          extend: 'print',
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6]
          }
        }
      ],
    };
  }

  cargarSucursal() {
    this._rproductos.obtenerSucursal(this.usuario.sucursal).subscribe((sucursal: any) => {
      this.sucursal = sucursal.data;
    });
  }

  cargarDevoluciones() {
    this._rproductos.obtenerDevoluciones(this.usuario.sucursal).subscribe((devoluciones: any) => {
      this.devoluciones = devoluciones.data;
    });
  }

  cargarTicket(id: any) {
    this.idSucursal = id;
    this._rproductos.obtenerTicket(id).subscribe((ticket: any) => {
      this.ticket = ticket.data
    });
  }


  buscar() {
    this._rproductos.obtenerArticulos(this.TicketID).subscribe((dticket: any) => {
      this.dticket = dticket.data
    });
  }

  guardar(){
    let cadena = '';

    for(let i = 0; i < Object.values(this.dticket).length; i++){
      if(this.dticket[i].cdevolver > this.dticket[i].cantidad){
        cadena += '- ' + this.dticket[i].nombre + '\n';
      }
    }
    if(cadena.length != 0){
      this.Toast.fire({
        icon: 'error',
        title: 'Favor de Verificar la Cantidad de los Productos\n' + cadena,
      });
    }
    this._rproductos.insertarGuardarDevolucion(this.dticket).subscribe((data: any) => {
      this.data = data;
      if (this.data.code === 200) {
        this.Toast.fire({
          icon: 'success',
          title: this.data.data,
        });
        this.cargarSucursal();
        this.dticket = null;
        this.TicketID = '';
      } else if (this.data.code === 400) {
        this.Toast.fire({
          icon: 'error',
          title: this.data.data,
        });
      }
    });
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
        case 'detVentad':
          this.venta = id;
          this.letra = this.global.numeroALetras(this.venta.total, {
            plural: 'PESOS',
            singular: 'PESOS'
          });
          this.cargarVentad(id.idventa);
          break;

    }
    this.modalReference = this.modalService.open(modal, { size: 'xl', centered: true });
  }

  async cargarDVenta(id: any) {
    const datos = await this._rproductos.detalleVenta(id);
    this.ventadetalle = datos.data;
  }

  async cargarVentad(id: any) {
    const datos = await this._rproductos.detalleVentad(id);
    this.ventadetalle = datos.data;
    let total = 0;
    for(let i = 0; i < this.ventadetalle.length; i++){
      total += this.ventadetalle[i].precio;
    }
    this.venta.subtotal = total.toString();
    this.venta.total = total.toString();
  }

  cerrar() {
    this.modalReference.close();
  }
}
