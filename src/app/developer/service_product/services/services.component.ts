import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from './service/services.service';
import { Services } from './models/services';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  servicios: Services;
  serv: Services;
  clasificacion: any;
  modalReference = null;
  form: any;
  isSubmit: boolean;
  status: any;
  data: any;
  porcentaje: any = 1;
  public maskHour = [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/];
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


  constructor(private _service: ServicesService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refrescarTabla();
  }


  refrescarTabla() {
    this.cargarDTOpciones();
    this.cargarServicios();
  }


  cargarDTOpciones() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json',
      },
      processing: true,
      order: [[0, 'asc']],
      responsive: false,
    };
  }


  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }


  cargarServicios() {
    this._service.obtenerDatosServices().subscribe((servicios: any) => {
      this.servicios = servicios.data;
      // Calling the DT trigger to manually render the table
      this.rerender();
    });
  }


  cargarClasificacion(){
    this._service.obtenerDatosClasificacion()
      .subscribe((clasificacion: any) => {
        this.clasificacion = clasificacion.data;
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


  cerrar() {
    this.modalReference.close();
    this.refrescarTabla();
    this.serv = null;
  }


  ver(stat: any, empresa: any, modal: any) {
    this.cargarClasificacion();
    this.isSubmit = false;
    this.status = '';
    switch (stat) {
      case 'new':
        this.serv = new Services('', '1', '', '', '', '', '0', '', '', '', '', '', 0, '', '', '', '');
        this.status = stat;
        break;
      case 'update':
        this.serv = empresa;
        this.status = stat;
        break;
      case 'view':
        this.serv = empresa;
        this.status = stat;
        break;
      case 'increase':
        this.status = stat;
        break;
      default:
        break;
    }
    this.modalReference = this.modalService.open(modal, { size: 'xl', centered: true, });
  }


  guardar() {
    switch (this.status) {
      case 'new':
        this._service.insertarDatosServices(this.serv)
          .subscribe((data: any) => {
            this.data = data;
            if (this.data.code === 200) {
              this.Toast.fire({
                icon: 'success',
                title: this.data.data
              });
              this.status = '';
              this.serv = null;
              this.cerrar();
            } else if (this.data.code === 400) {
              this.Toast.fire({
                icon: 'error',
                title: this.data.data
              });
            }
          });
        break;
      case 'update':
        const id = this.serv.idarticulo;
        this._service.actualizarDatosServices(id, this.serv)
          .subscribe((data: any) => {
            this.data = data;
            if (this.data.code === 200) {
              this.Toast.fire({
                icon: 'success',
                title: this.data.data
              });
              this.status = '';
              this.serv = null;
              this.cerrar();
            } else if (this.data.code === 400) {
              this.Toast.fire({
                icon: 'error',
                title: this.data.data
              });
            }
          });
        break;
      case 'increase':
        const porcen = this.porcentaje;
        this._service.porcentajeDatosServices(porcen)
          .subscribe((data: any) => {
            this.data = data;
            if (this.data.code === 200) {
              this.Toast.fire({
                icon: 'success',
                title: this.data.data
              });
              this.status = '';
              this.porcentaje = null;
              this.cerrar();
            } else if (this.data.code === 400) {
              this.Toast.fire({
                icon: 'error',
                title: this.data.data
              });
            }
          });
        break;
      default:
        break;
    }
  }
}
