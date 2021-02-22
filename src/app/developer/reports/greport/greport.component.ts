import { Component, LOCALE_ID, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GreportService } from './service/greport.service';
import { Greport } from './models/greport';
import { Subject } from 'rxjs';
import { LocalService } from './../../../global/encriptacion/local.service';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import localeEs from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es-MX');

@Component({
  selector: 'app-greport',
  templateUrl: './greport.component.html',
  providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }],
  styleUrls: ['./greport.component.scss']
})
export class GreportComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger = new Subject();
  greporte: Greport;
  modalReference = null;
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

  constructor(private _greporte: GreportService, private _local: LocalService) { }

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

  cargarReporte() {
    this._greporte.obtenerReporteG(this.usuario.sucursal).subscribe((greporte: any) => {
      this.greporte = greporte.data;
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
}
