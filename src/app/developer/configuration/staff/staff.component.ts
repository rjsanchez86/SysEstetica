import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StaffService } from './service/staff.service';
import { Staff, Estatus } from './models/staff';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  sucursales: any;
  puestos: any;
  personal: Staff;
  per: Staff;
  modalReference = null;
  form: any;
  isSubmit: boolean;
  status: any;
  data: any;
  color: any;
  estatusP: Estatus;
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


  constructor(private _staff: StaffService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refrescarTabla();
  }


  refrescarTabla() {
    this.cargarDTOpciones();
    this.cargarPersonal();
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


  cargarPersonal() {
    this._staff.obtenerStaff()
      .subscribe((personal: any) => {
        this.personal = personal.data;
        // Calling the DT trigger to manually render the table
        this.rerender();
      });
  }


  cargarPuestos() {
    this._staff.obtenerDatosPuestos().subscribe((puestos: any) => {
      this.puestos = puestos.data;
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


  ver(stat: any, personal: any, modal: any) {
    this.cargarPuestos();
    this.isSubmit = false;
    this.status = '';
    if (stat === 'new') {
      this.per = new Staff('', '0', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
      this.status = stat;
      this.color = '#2889e9';
    }
    if (stat === 'update') {
      this.per = personal;
      this.status = stat;
      this.color = this.per.color;
    }
    if (stat === 'view') {
      this.per = personal;
      this.status = stat;
    }
    this.modalReference = this.modalService.open(modal, { size: 'xl', centered: true });
  }


  async estatus(personal: any) {
    let sta = personal.estatus;

    const { value: accept } = await Swal.fire({
      title: '¿Deseas cambiar el estatus de ' + personal.nombre + '?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    });
    this.estatusP = new Estatus('');
    if (accept) {
      if (sta === 'Activo') {
        this.estatusP.estatus = 'No Activo';
      } else {
        this.estatusP.estatus = 'Activo';
      }
      this._staff.actualizarEstatusStaff(personal.idpersonal, this.estatusP)
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
    this.per.color = this.color;
    if (this.status === 'new') {
      this._staff.insertarDatosStaff(this.per)
        .subscribe((data: any) => {
          this.data = data;
          if (this.data.code === 200) {
            this.Toast.fire({
              icon: 'success',
              title: this.data.data
            });
            this.status = '';
            this.per = null;
            this.cerrar();
          } else if (this.data.code === 400) {
            this.Toast.fire({
              icon: 'error',
              title: this.data.data
            });
          }
        });
    } else if (this.status === 'update') {
      const id = this.per.idpersonal;
      this._staff.actualizarDatosStaff(id, this.per)
        .subscribe((data: any) => {
          this.data = data;
          if (this.data.code === 200) {
            this.Toast.fire({
              icon: 'success',
              title: this.data.data
            });
            this.status = '';
            this.per = null;
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
