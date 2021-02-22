import { Component, LOCALE_ID, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-MX';
registerLocaleData(localeEs, 'es');
import { Sucursal, CGastos, TGastos, Gastos } from "./models/expenses";
import { ExpensesService } from "./service/expenses.service";
import { LocalService } from 'src/app/global/encriptacion/local.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger = new Subject();
  status: any;
  modalReference = null;
  sucursal: Sucursal;
  gastos: Gastos;
  gast: Gastos;
  cgastos: CGastos;
  tgastos: TGastos;
  addcgastos: CGastos;
  IdCGastos: any;
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
  usuario: any;
  data: any;

  constructor(private _local: LocalService, private _gastos: ExpensesService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.usuario = this._local.getJsonValue('user');
    this.usuario = this.usuario[0];
    this.refrescarTabla();
  }

  refrescarTabla() {
    this.cargarDTOpciones();
    this.cargarGastos();
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
            columns: [0, 1, 2, 3, 4, 5, 6]
          }
        },
        {
          extend: 'excelHtml5',
          text: '<i class="feather icon-file-text"></i>',
          titleAttr: 'Excel',
          autoFilter: true,
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6]
          }
        },
        {
          extend: 'print',
          text: '<i class="feather icon-printer"></i>',
          titleAttr: 'Imprimir',
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6]
          }
        }
      ],
      order: [[0, 'asc']],
      responsive: false,
    };
  }

  cargarGastos() {
    this._gastos.obtenerGastos(this.usuario.sucursal).subscribe((gastos: any) => {
      this.gastos = gastos.data;
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


  cargarSucursal() {
    this._gastos.obtenerSucursal(this.usuario.sucursal).subscribe((sucursal: any) => {
      this.sucursal = sucursal.data;
    });
  }

  cargarCGastos() {
    this._gastos.obtenerCGastos().subscribe((cgastos: any) => {
      this.cgastos = cgastos.data;
    });
  }

  cargarTGastos() {
    this._gastos.obtenerTGastos().subscribe((tgastos: any) => {
      this.tgastos = tgastos.data;
    });
  }

  ver(status: any, clientes: any, modal: any) {
    this.status = '';
    this.status = status;
    switch (status) {
      case 'new':
        this.cargarSucursal();
        this.cargarCGastos();
        this.cargarTGastos();
        this.gast = new Gastos('0', '0', '', '', '', '', '', '', '', '');
        break;
      default:
        break;
    }
    this.modalReference = this.modalService.open(modal, { size: 'xl', centered: true });
  }

  async cGasto() {
    const cgastos = await Swal.fire({
      title: 'Concepto Gasto',
      icon: 'question',
      input: 'text',
      inputLabel: 'Escribe el concepto a agregar',
    });
    this.addcgastos = new CGastos('', cgastos.value);
    this._gastos.insertarCGasto(this.addcgastos).subscribe((data: any) => {
      this.data = data;
      if (this.data.code === 200) {
        this.Toast.fire({
          icon: 'success',
          title: this.data.data,
        });
        this.cargarCGastos();
      } else if (this.data.code === 400) {
        this.Toast.fire({
          icon: 'error',
          title: this.data.data,
        });
      }
    });
  }

  guardar() {
    this.gast.idcgastos = this.IdCGastos;
    this._gastos.insertarGasto(this.gast).subscribe((data: any) => {
      this.data = data;
      if (this.data.code === 200) {
        this.Toast.fire({
          icon: 'success',
          title: this.data.data,
        });
        this.status = '';
        this.gast = null;
        this.cerrar();
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
