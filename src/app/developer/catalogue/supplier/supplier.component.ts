import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SupplierService } from './service/supplier.service';
import { Supplier } from './models/supplier';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  proveedor: Supplier;
  pro: Supplier;
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


  constructor(private _supplier: SupplierService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refrescarTabla();
  }


  refrescarTabla() {
    this.cargarDTOpciones();
    this.cargarProveedor();
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


  cargarProveedor() {
    this._supplier.obtenerProveedor().subscribe((proveedor: any) => {
      this.proveedor = proveedor.data;
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


  ver(stat: any, proveedor: any, modal: any) {
    this.isSubmit = false;
    this.status = '';
    switch (stat) {
      case 'new':
        this.pro = new Supplier('', '', '', '', '', '', '', '');
        this.status = stat;
        break;
      case 'update':
        this.pro = proveedor;
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
        this._supplier.insertarDatosProveedor(this.pro).subscribe((data: any) => {
          this.data = data;
          if (this.data.code === 200) {
            this.Toast.fire({
              icon: 'success',
              title: this.data.data,
            });
            this.status = '';
            this.pro = null;
            this.cerrar();
          } else if (this.data.code === 400) {
            this.Toast.fire({
              icon: 'error',
              title: this.data.data,
            });
          }
        });
        break;
      case 'update':
        const id = this.pro.idproveedor;
        this._supplier.actualizarDatosProveedor(id, this.pro)
          .subscribe((data: any) => {
            this.data = data;
            if (this.data.code === 200) {
              this.Toast.fire({
                icon: 'success',
                title: this.data.data,
              });
              this.status = '';
              this.pro = null;
              this.cerrar();
            } else if (this.data.code === 400) {
              this.Toast.fire({
                icon: 'error',
                title: this.data.data,
              });
            }
          });
        break;
      default:
        break;
    }
  }
}
