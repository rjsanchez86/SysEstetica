import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ClassificationService } from './service/classification.service';
import { Classification } from './models/classification';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss']
})
export class ClassificationComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger = new Subject();
  empresas: any;
  clasificacion: Classification;
  cla: Classification;
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


  constructor(private _clasificacion: ClassificationService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.refrescarTabla();
  }


  refrescarTabla() {
    this.cargarDTOpciones();
    this.cargarClasificacion();
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


  cargarClasificacion() {
    this._clasificacion.obtenerClasificacion().subscribe((clasificacion: any) => {
      this.clasificacion = clasificacion.data;
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
      this.cla = new Classification('', '');
      this.status = stat;
    }
    if (stat === 'update') {
      this.cla = metodo;
      this.status = stat;
    }
    this.modalReference = this.modalService.open(modal, {
      size: 'xl',
      centered: true,
    });
  }


  guardar() {
    if (this.status === 'new') {
      this._clasificacion.insertarDatosClasificacion(this.cla).subscribe((data: any) => {
        this.data = data;
        if (this.data.code === 200) {
          this.Toast.fire({
            icon: 'success',
            title: this.data.data,
          });
          this.status = '';
          this.cla = null;
          this.cerrar();
        } else if (this.data.code === 400) {
          this.Toast.fire({
            icon: 'error',
            title: this.data.data,
          });
        }
      });
    } else if (this.status === 'update') {
      const id = this.cla.idclasificacion;
      this._clasificacion.actualizarDatosClasificacion(id, this.cla)
        .subscribe((data: any) => {
          this.data = data;
          if (this.data.code === 200) {
            this.Toast.fire({
              icon: 'success',
              title: this.data.data,
            });
            this.status = '';
            this.cla = null;
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

