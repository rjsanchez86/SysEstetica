import { Component, LOCALE_ID, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ListpordersService } from './service/listporders.service';
import { Lordenes, Dordenes } from './models/listporders';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import localeEs from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { LocalService } from 'src/app/global/encriptacion/local.service';
registerLocaleData(localeEs, 'es-MX');

@Component({
  selector: 'app-listporders',
  templateUrl: './listporders.component.html',
  providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }],
  styleUrls: ['./listporders.component.scss']
})
export class ListpordersComponent implements OnDestroy, OnInit {
  public today = Date.now();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger = new Subject();
  lordenes: Lordenes;
  ordenes: Lordenes;
  dordenes: Dordenes;
  modalReference = null;
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
  data: any;

  constructor(private _local: LocalService, private _lordenes: ListpordersService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.usuario = this._local.getJsonValue('user');
    this.usuario = this.usuario[0];
    this.refrescarTabla();
  }

  refrescarTabla() {
    this.cargarDTOpciones();
    this.cargarReporte();
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
          titleAttr: 'Copiar',
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
          }
        },
        {
          extend: 'excelHtml5',
          text: '<i class="feather icon-file-text"></i>',
          autoFilter: true,
          titleAttr: 'Excel',
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
          }
        },
        {
          extend: 'print',
          text: '<i class="feather icon-printer"></i>',
          titleAttr: 'Imprimir',
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
          }
        }
      ],
      order: [[0, 'desc']],
      responsive: false,
    };
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  cargarReporte() {
    this._lordenes.obtenerListOrdenes(this.usuario.sucursal).subscribe((lordenes: any) => {
      this.lordenes = lordenes.data;
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
      case 'ordenDetalle':
        this.ordenes = id;
        this.detalleVentas(this.ordenes.idorden);
        break;
    }
    this.modalReference = this.modalService.open(modal, { size: 'xl', centered: true });
  }

  async detalleVentas(id: any) {
    const datos = await this._lordenes.obtenerDetalleOrden(id);
    this.dordenes = datos.data;
  }

  autorizar(id: any, modal: any){
    this._lordenes.autorizarOrdenes(id.idorden, this.usuario.id).subscribe((data: any) => {
      this.data = data;

      if (this.data.code === 200) {
        this.Toast.fire({
          icon: 'success',
          title: this.data.data,
        });
        id.estatus = 'Pendiente';
        id.autoriza = this.usuario.firstName
        this.cerrar();
        this.ver('ordenDetalle', id, modal);
        this.refrescarTabla();
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
