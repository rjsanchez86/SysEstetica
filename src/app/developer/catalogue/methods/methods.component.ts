import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MethodsService } from './service/methods.service';
import { Methods } from './models/methods';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.scss'],
})
export class MethodsComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger = new Subject();
  empresas: any;
  metodos: Methods;
  met: Methods;
  modalReference = null;
  form: any;
  isSubmit: boolean;
  status: any;
  data: any;
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


  constructor(private _methods: MethodsService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.refrescarTabla();
  }


  refrescarTabla() {
    this.cargarDTOpciones();
    this.cargarMPagos();
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
      dom: 'Bfrtip',
      buttons: [
        {
            extend: 'copyHtml5',
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6 ]
            }
        },
        {
            extend: 'excelHtml5',
            autoFilter: true,
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6 ]
            }
        },
        {
            extend: 'print',
            exportOptions: {
              columns: [ 0, 1, 2, 3, 4, 5, 6 ]
            }
        }
      ],
    };
  }


  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }


  cargarMPagos() {
    this._methods.obtenerMPagos().subscribe((metodos: any) => {
      this.metodos = metodos.data;
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


  ver(stat: any, metodo: any, modal: any) {
    this.isSubmit = false;
    this.status = '';
    if (stat === 'new') {
      this.met = new Methods('', '', '');
      this.status = stat;
    }
    if (stat === 'update') {
      this.met = metodo;
      this.status = stat;
    }
    this.modalReference = this.modalService.open(modal, {
      size: 'xl',
      centered: true,
    });
  }


  guardar() {
    if (this.status === 'new') {
      this._methods.insertarDatosMPagos(this.met).subscribe((data: any) => {
        this.data = data;
        if (this.data.code === 200) {
          this.Toast.fire({
            icon: 'success',
            title: this.data.data,
          });
          this.status = '';
          this.met = null;
          this.cerrar();
        } else if (this.data.code === 400) {
          this.Toast.fire({
            icon: 'error',
            title: this.data.data,
          });
        }
      });
    } else if (this.status === 'update') {
      const id = this.met.idmpagos;
      this._methods
        .actualizarDatosMPagos(id, this.met)
        .subscribe((data: any) => {
          this.data = data;
          if (this.data.code === 200) {
            this.Toast.fire({
              icon: 'success',
              title: this.data.data,
            });
            this.status = '';
            this.met = null;
            this.cerrar();
          } else if (this.data.code === 400) {
            this.Toast.fire({
              icon: 'error',
              title: this.data.data,
            });
          }
        });
    }
  }
}
