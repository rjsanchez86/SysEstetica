import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WharehouselistService } from './service/wharehouselist.service';
import { Wharehouselist } from './models/wharehouselist';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { LocalService } from './../../../global/encriptacion/local.service';

@Component({
  selector: 'app-wharehouselist',
  templateUrl: './wharehouselist.component.html',
  styleUrls: ['./wharehouselist.component.scss']
})
export class WharehouselistComponent implements  OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger = new Subject();
  lista: Wharehouselist;
  usuario: any;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  });

  constructor(private _local: LocalService, private _list: WharehouselistService) { }


  ngOnInit() {
    this.usuario = this._local.getJsonValue('user');
    this.usuario = this.usuario[0];
    this.refrescarTabla();
   }

  refrescarTabla(){
    this.cargarDTOpciones();
    this.cargarLista();
  }

  cargarDTOpciones(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json',
      },
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        {
            extend: 'copyHtml5',
        },
        {
            extend: 'excelHtml5',
            autoFilter: true,
        },
        {
            extend: 'print',
        }
    ],
      order: [[ 0, 'desc' ]],
      responsive: false,
    };
  }

  cargarLista(){
    this._list.obtenerLista(this.usuario.sucursal).subscribe((lista: any) => {
        this.lista = lista.data;
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

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }
}
