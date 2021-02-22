import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { InventoryService } from './service/inventory.service';
import { Inventario } from './models/inventory';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { LocalService } from './../../../global/encriptacion/local.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger = new Subject();
  inventario: Inventario;
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

  constructor(private _inventario: InventoryService, private _local: LocalService) { }

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
      order: [[0, 'asc']],
      responsive: false,
    };
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  cargarInventorio() {
    this._inventario.obtenerInventario(this.usuario.sucursal).subscribe((inventario: any) => {
      this.inventario = inventario.data;
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
