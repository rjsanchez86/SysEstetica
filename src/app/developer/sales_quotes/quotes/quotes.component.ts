import { Component, LOCALE_ID, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { QuotesService } from './service/quotes.service';
import { Quotes, Cliente, Agenda, Cancelar, ListQuotes } from './models/quotes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import localeEs from '@angular/common/locales/es-MX';
import Swal from 'sweetalert2';
import { LocalService } from './../../../global/encriptacion/local.service';
registerLocaleData(localeEs, 'es');
import esLocale from '@fullcalendar/core/locales/es'

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  styleUrls: ['./quotes.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QuotesComponent implements OnDestroy, OnInit {
  @ViewChild('agendaModal', { static: false }) myModalAgenda: TemplateRef<any>;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger = new Subject();
  calendarOptions: CalendarOptions;
  quotes: Quotes;
  cliente: Cliente;
  cancelar: Cancelar;
  eventos: any = [];
  clientes: any;
  sucursal: any;
  articulos: any;
  personal: any;
  agenda: Agenda;
  cli: any = [];
  suc: any = [];
  serv: any = [];
  per: any = [];
  ClienteId = '0';
  SucursalId = '0';
  ArticulosId = '0';
  PersonalId = '0';
  Fecha = '';
  Hora = '';
  Json: any;
  events: any;
  data: any;
  observacion: any = '';
  modalReference = null;
  empresas: any;
  lagenda: ListQuotes;
  lag: ListQuotes;
  form: any;
  isSubmit: boolean;
  status: any;
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


  constructor(private _local: LocalService, private _quotes: QuotesService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.usuario = this._local.getJsonValue('user');
    this.usuario = this.usuario[0];
    this.cargarDatos();
    this.cargarAgenda();
    this.refrescarTabla();
  }


  cargarAgenda() {
    this.calendarOptions = {
      initialView: 'dayGridMonth'
    };
    this._quotes.obtenerCalendario(this.usuario.sucursal).subscribe((event: any) => {
      this.eventos = event.data;
      this.calendarOptions = {
        eventClick: this.detalleAgenda.bind(this),
        locale: esLocale,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        editable: false,
        dayMaxEvents: true,
        events: this.eventos,
      };
    });
  }


  cargarDatos() {
    this.cli = [];
    this.suc = [];
    this.serv = [];
    this.per = [];
    this.ClienteId = '0';
    this.SucursalId = '0';
    this.ArticulosId = '0';
    this.PersonalId = '0';
    this.Fecha = '';
    this.Hora = '';
    this.cargarClientes();
    this.cargarSucursal();
    this.cargarServicios();
    this.cargarPersonal();
  }


  cargarClientes() {
    this._quotes.obtenerDatosClientes().subscribe((client: any) => {
      this.clientes = client.data;
    });
  }


  cargarSucursal() {
    this._quotes.obtenerDatosSucursal(this.usuario.sucursal).subscribe((sucursal: any) => {
      this.sucursal = sucursal.data;
    });
  }


  cargarServicios() {
    this._quotes.obtenerDatosArticulos().subscribe((articulos: any) => {
      this.articulos = articulos.data;
    });
  }


  cargarPersonal() {
    this._quotes.obtenerDatosPersonal().subscribe((personal: any) => {
      this.personal = personal.data;
    });
  }


  refrescarTabla() {
    this.cargarDTOpciones();
    this.cargarLista();
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


  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }


  cargarLista() {
    this._quotes.obtenerListaAgenda().subscribe((lagenda: any) => {
      this.lagenda = lagenda.data;
      // Calling the DT trigger to manually render the table
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


  obtenerDato(event: any, tipo: any) {
    switch (tipo) {
      case 'clien':
        this.cli.push(event);
        break;
      case 'sucur':
        this.suc.push(event);
        break;
      case 'servi':
        this.serv = [];
        this.serv.push(event);
        break;
      case 'pers':
        this.per.push(event);
        break;
    }
  }


  ver(modal: any, tipo: any) {
    switch (tipo) {
      case 'cliente':
        this.cliente = new Cliente('', '', '', '', '');
        break;
    }
    this.modalReference = this.modalService.open(modal, {
      size: 'xl',
      centered: true,
    });
  }


  cancelarCita(modal: any, agenda: any) {
    this.cerrar();
    this.cancelar = new Cancelar(agenda.idagenda, 'Cancelada', '');
    this.modalReference = this.modalService.open(modal, {
      size: 'xl',
      centered: true,
    });
  }


  actualizarCita(modal: any, agenda: any) {
    this.cerrar();
    this.modalReference = this.modalService.open(modal, {
      size: 'xl',
      centered: true,
    });
  }


  cerrar() {
    this.modalReference.close();
  }


  guardarCliente() {
    this._quotes.insertarDatosCliente(this.cliente).subscribe((data: any) => {
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


  guardar() {
    // tslint:disable-next-line: max-line-length
    this.quotes = new Quotes(
      this.ClienteId,
      this.SucursalId,
      this.PersonalId,
      this.Fecha,
      this.Hora,
      this.observacion,
      this.ArticulosId
    );
    this._quotes.insertarAgenda(this.quotes).subscribe((data: any) => {
      this.data = data;
      if (this.data.code === 200) {
        this.Toast.fire({
          icon: 'success',
          title: this.data.data,
        });
        this.detalleAgendaVer(this.data.id);
        this.quotes = new Quotes('', '', '', '', '', '', '');
        this.cargarDatos();
        this.cargarAgenda();
        this.refrescarTabla();
      } else if (this.data.code === 400) {
        this.Toast.fire({
          icon: 'error',
          title: this.data.data,
        });
      }
    });
  }


  guardarCancelacion() {
    const id = this.cancelar.idagenda;
    this._quotes.actualizarEstatusCita(id, this.cancelar).subscribe((data: any) => {
      this.data = data;
      if (this.data.code === 200) {
        this.Toast.fire({
          icon: 'success',
          title: this.data.data,
        });
        this.cancelar = null;
        this.cargarDatos();
        this.cargarAgenda();
        this.refrescarTabla();
        this.cerrar();
      } else if (this.data.code === 400) {
        this.Toast.fire({
          icon: 'error',
          title: this.data.data,
        });
      }
    });
  }


  guardarActualizacionCita() {
    const id = this.agenda.idagenda;
    this._quotes.actualizarCita(id, this.agenda).subscribe((data: any) => {
      this.data = data;
      if (this.data.code === 200) {
        this.Toast.fire({
          icon: 'success',
          title: this.data.data,
        });
        this.detalleAgendaVer(this.data.id);
        this.cancelar = null;
        this.cargarDatos();
        this.cargarAgenda();
        this.refrescarTabla();
        this.cerrar();
      } else if (this.data.code === 400) {
        this.Toast.fire({
          icon: 'error',
          title: this.data.data,
        });
      }
    });
  }


  detalleAgenda(arg: EventClickArg) {
    this.agenda = new Agenda('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
    this._quotes.obtenerDetalleAgenda(arg.event.id.toString()).subscribe((detalle: any) => {
      this.agenda = detalle.data[0];
      this.modalReference = this.modalService.open(this.myModalAgenda, {size: 'xl', centered: true,});
    });
  }


  detalleAgendaVer(id: any) {
    this.agenda = new Agenda('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
    this._quotes.obtenerDetalleAgenda(id).subscribe((detalle: any) => {
      this.agenda = detalle.data[0];
      this.modalReference = this.modalService.open(this.myModalAgenda, {size: 'xl', centered: true,});
    });
  }
}
