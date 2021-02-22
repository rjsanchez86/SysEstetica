import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SucursalService } from './service/sucursal.service';
import { Sucursal, Estatus } from './models/sucursal';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.scss']
})
export class SucursalComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  empresas: any;
  sucursales: Sucursal;
  suc: Sucursal;
  modalReference = null;
  form: any;
  isSubmit: boolean;
  status: any;
  data: any;
  estatusS: Estatus;
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


  constructor(private _sucursal: SucursalService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refrescarTabla();
  }

  /**Refresca la Interfaz */
  refrescarTabla() {
    this.cargarDTOpciones();
    this.cargarSucursales();
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

  cargarSucursales() {
    this._sucursal.obtenerDatosSucursales()
      .subscribe((sucursal: any) => {
        this.sucursales = sucursal.data;
        // Calling the DT trigger to manually render the table
        this.rerender();
      });
  }


  cargarEmpresas() {
    this._sucursal.obtenerDatosCompanys()
      .subscribe((empresa: any) => {
        this.empresas = empresa.data;
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

  ver(stat: any, sucursal: any, modal: any) {
    this.cargarEmpresas();
    this.isSubmit = false;
    this.status = '';
    switch (stat) {
      case 'new':
        this.suc = new Sucursal('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
        break;
      case 'update':
        this.suc = sucursal;
        break;
      case 'view':
        this.suc = sucursal;
        break;
      default:
        this.status = '';
        break;
    }
    this.status = stat;
    this.modalReference = this.modalService.open(modal, { size: 'xl', centered: true });
  }

  async estatus(sucursal: any) {
    let sta = sucursal.estatus;
    const { value: accept } = await Swal.fire({
      title: '¿Deseas cambiar el estatus de ' + sucursal.sucursal + '?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    });
    this.estatusS = new Estatus('');
    if (accept) {
      if (sta === 'Activo') {
        this.estatusS.estatus = 'No Activo';
      } else {
        this.estatusS.estatus = 'Activo';
      }
      this._sucursal.actualizarEstatusSucursal(sucursal.idsucursal, this.estatusS)
        .subscribe((data: any) => {
          this.data = data;
          if (this.data.code === 200) {
            this.Toast.fire({
              icon: 'success',
              title: this.data.data
            });
            this.refrescarTabla();
          } else if (this.data.code === 400) {
            this.Toast.fire({
              icon: 'error',
              title: this.data.data
            });
          }
        });
    }
  }


  guardar() {
    switch (this.status) {
      case 'new':
        this._sucursal.insertarDatosSucursal(this.suc)
          .subscribe((data: any) => {
            this.data = data;
            if (this.data.code === 200) {
              this.Toast.fire({
                icon: 'success',
                title: this.data.data
              });
              this.status = '';
              this.suc = null;
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
        const id = this.suc.idsucursal;
        this._sucursal.actualizarDatosSucursal(id, this.suc)
          .subscribe((data: any) => {
            this.data = data;
            if (this.data.code === 200) {
              this.Toast.fire({
                icon: 'success',
                title: this.data.data
              });
              this.status = '';
              this.suc = null;
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
