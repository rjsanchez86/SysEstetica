import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { InventorymService } from './service/inventorym.service';
import { InventarioM } from './models/inventorym';
import { Subject } from 'rxjs';
import { LocalService } from './../../../global/encriptacion/local.service';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventorym',
  templateUrl: './inventorym.component.html',
  styleUrls: ['./inventorym.component.scss']
})
export class InventorymComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger = new Subject();
  inventoriom: InventarioM;
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

  constructor(private _Inventoriom: InventorymService, private _local: LocalService) { }

  ngOnInit(): void {
    this.usuario = this._local.getJsonValue('user');
    this.usuario = this.usuario[0];
    this.refrescarTabla();
  }

  refrescarTabla() {
    this.cargarDTOpciones();
    this.cargarInventorio();
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
            titleAttr: 'Excel'
        },
        {
            extend: 'print',
            text: '<i class="feather icon-printer"></i>',
            titleAttr: 'Imprimir'
        }
    ],
      order: [[ 0, 'asc' ]],
      responsive: false,
    };
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  cargarInventorio() {
    this._Inventoriom.obtenerInventarioM(this.usuario.sucursal).subscribe((inventoriom: any) => {
      this.inventoriom = inventoriom.data;
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

}
