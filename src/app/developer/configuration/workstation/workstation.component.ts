import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WorkstationService } from './service/workstation.service';
import { Workstation, Comision } from './models/workstation';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-workstation',
  templateUrl: './workstation.component.html',
  styleUrls: ['./workstation.component.scss']
})
export class WorkstationComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  puestos: Workstation;
  pue: Workstation;
  comision: Comision;
  modalReference = null;
  form: any;
  isSubmit: boolean;
  status: any;
  data: any;
  ischecked: boolean;
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

  constructor(private _workstation: WorkstationService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refrescarTabla();
  }


  refrescarTabla() {
    this.cargarDTOpciones();
    this.cargarPuestos();
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


  cargarPuestos() {
    this._workstation.obtenerDatosPuestos().subscribe((puestos: any) => {
      this.puestos = puestos.data;
      // Calling the DT trigger to manually render the table
      this.rerender();
    });
  }


  cargarComision(id: string) {
    this._workstation.obtenerDatosComision(id).subscribe((comision: any) => {
      this.comision = comision.data;
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


  ver(stat: any, puesto: any, modal: any) {
    this.isSubmit = false;
    this.status = '';
    switch (stat) {
      case 'new':
        this.pue = new Workstation('', '', '0');
        this.status = stat;
        break;
      case 'update':
        this.pue = puesto;
        this.status = stat;
        switch (this.pue.comision) {
          case '0':
            this.ischecked = false;
            break;
          case '1':
            this.ischecked = true;
            break;
        }
        break;
      case 'view':
        this.pue = puesto;
        this.status = stat;
        break;
      case 'comision':
        this.pue = puesto;
        this.cargarComision(this.pue.idpuesto);
        this.status = stat;
        break;
    }
    this.modalReference = this.modalService.open(modal, {
      size: 'xl',
      centered: true,
    });
  }


  guardar() {
    switch (this.ischecked) {
      case true:
        this.pue.comision = '1';
        break;
      case false:
        this.pue.comision = '0';
        break;
    }
    switch (this.status) {
      case 'new':
        this._workstation.insertarDatosPuestos(this.pue).subscribe((data: any) => {
          this.data = data;
          if (this.data.code === 200) {
            this.Toast.fire({
              icon: 'success',
              title: this.data.data,
            });
            this.status = '';
            this.pue = null;
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
        const id = this.pue.idpuesto;
        this._workstation
          .actualizarDatosPuestos(id, this.pue)
          .subscribe((data: any) => {
            this.data = data;
            if (this.data.code === 200) {
              this.Toast.fire({
                icon: 'success',
                title: this.data.data,
              });
              this.status = '';
              this.pue = null;
              this.cerrar();
            } else if (this.data.code === 400) {
              this.Toast.fire({
                icon: 'error',
                title: this.data.data,
              });
            }
          });
        break;
      case 'comision':
        const idp = this.pue.idpuesto;
        this._workstation.insertarComision(idp, this.comision).subscribe((data: any) => {
          this.data = data;
          if (this.data.code === 200) {
            this.Toast.fire({
              icon: 'success',
              title: this.data.data,
            });
            this.status = '';
            this.pue = null;
            this.comision = null;
            this.cerrar();
          } else if (this.data.code === 400) {
            this.Toast.fire({
              icon: 'error',
              title: this.data.data,
            });
          }
        });
        break;
    }
  }

}
