import { Sucursal } from './../../configuration/sucursal/models/sucursal';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Wherehouse } from './models/whrehouse';
import { WharehouseService } from './service/wharehouse.service';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { LocalService } from './../../../global/encriptacion/local.service';

@Component({
  selector: 'app-wharehouse',
  templateUrl: './wharehouse.component.html',
  styleUrls: ['./wharehouse.component.scss']
})
export class WharehouseComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger = new Subject();
  empresas: any;
  almacen: Wherehouse;
  alm: Wherehouse;
  sucursal: Sucursal;
  modalReference = null;
  form: any;
  isSubmit: boolean;
  status: any;
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


  constructor(private _local: LocalService, private _wharehouse: WharehouseService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.usuario = this._local.getJsonValue('user');
    this.usuario = this.usuario[0];
    this.refrescarTabla();
  }


  refrescarTabla() {
    this.cargarDTOpciones();
    this.cargarAlmacen();
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


  cargarSucursal() {
    this._wharehouse.obtenerSucursal(this.usuario.sucursal).subscribe((sucursal: any) => {
      this.sucursal = sucursal.data;
    });
  }


  cargarAlmacen() {
    this._wharehouse.obtenerAlmacenes(this.usuario.sucursal).subscribe((almacen: any) => {
      this.almacen = almacen.data;
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


  cerrar() {
    this.modalReference.close();
    this.refrescarTabla();
  }


  ver(stat: any, almacen: any, modal: any) {
    this.cargarSucursal();
    this.isSubmit = false;
    this.status = '';
    switch (stat) {
      case 'new':
        this.alm = new Wherehouse('', '0', '', '');
        this.status = stat;
        break;
      case 'update':
        this.alm = almacen;
        this.status = stat;
        break;
    }
    this.modalReference = this.modalService.open(modal, {
      size: 'xl',
      centered: true,
    });
  }


  guardar() {
    switch (this.status) {
      case 'new':
        this._wharehouse.insertarDatosAlmacenes(this.alm)
          .subscribe((data: any) => {
            this.data = data;
            if (this.data.code === 200) {
              this.Toast.fire({
                icon: 'success',
                title: this.data.data
              });
              this.status = '';
              this.alm = null;
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
        const id = this.alm.idalmacen;
        this._wharehouse.actualizarDatosAlmacenes(id, this.alm)
          .subscribe((data: any) => {
            this.data = data;
            if (this.data.code === 200) {
              this.Toast.fire({
                icon: 'success',
                title: this.data.data
              });
              this.status = '';
              this.alm = null;
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
