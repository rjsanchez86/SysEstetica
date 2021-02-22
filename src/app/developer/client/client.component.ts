import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ClientService } from './service/client.service';
import { Cliente } from './models/client';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger = new Subject();
  clientes: Cliente;
  cli: Cliente;
  ncli: Cliente;
  status: any;
  modalReference = null;
  form: any;
  isSubmit: boolean;
  data: any;
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

  constructor(private _clientes: ClientService, private modalService: NgbModal) { }

  ngOnInit() {
    this.refrescarTabla();
  }

  refrescarTabla() {
    this.cargarDTOpciones();
    this.cargarClientes();
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

  cargarClientes() {
    this._clientes.obtenerDatosClientes().subscribe((client: any) => {
        this.clientes = client.data;
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

  ver(status: any, clientes: any, modal: any) {
    this.isSubmit = false;
    this.status = '';
    if (status === 'new') {
      this.cli = new Cliente('', '', '', '', '', '0', '', '', '', '', '', '', '');
      this.status = status;
    } else {
      this.cli = clientes;
      this.status = status;
    }
    this.modalReference = this.modalService.open(modal, { size: 'xl', centered: true });
  }

  cerrar() {
    this.modalReference.close();
    this.refrescarTabla();
  }

  guardar(form: any) {
    if (!form.valid) {
      this.isSubmit = true;
      return;
    } else {
      if (this.status === 'new') {
        this._clientes.insertarDatosCliente(this.cli)
          .subscribe((data: any) => {
            this.data = data;
            if (this.data.code === 200) {
              this.Toast.fire({
                icon: 'success',
                title: this.data.data
              });
              this.status = '';
              this.cli = null;
              this.cerrar();
            } else if (this.data.code === 400) {
              this.Toast.fire({
                icon: 'error',
                title: this.data.data
              });
            }
          });
      } else if (this.status === 'update') {
        const id = this.cli.idcliente;
        this._clientes.actualizarDatosCliente(id, this.cli)
          .subscribe((data: any) => {
            this.data = data;
            if (this.data.code === 200) {
              this.Toast.fire({
                icon: 'success',
                title: this.data.data
              });
              this.status = '';
              this.cli = null;
              this.cerrar();
            } else if (this.data.code === 400) {
              this.Toast.fire({
                icon: 'error',
                title: this.data.data
              });
            }
          });
      }
    }
  }
}
