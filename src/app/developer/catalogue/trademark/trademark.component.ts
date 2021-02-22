import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrademarkService } from './service/trademark.service';
import { Marca, SubMarca } from './models/trademark';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { switchMapTo } from 'rxjs/operators';

@Component({
  selector: 'app-trademark',
  templateUrl: './trademark.component.html',
  styleUrls: ['./trademark.component.scss']
})
export class TrademarkComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  marcas: Marca;
  mar: Marca;
  submarcas: SubMarca;
  smar: SubMarca;
  submar: '';
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

  constructor(

    private _trademark: TrademarkService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.refrescarTabla();
  }


  refrescarTabla() {
    this.cargarDTOpciones();
    this.cargarMarca();
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


  cargarMarca() {
    this._trademark.obtenerMarca().subscribe((marcas: any) => {
      this.marcas = marcas.data;
      // Calling the DT trigger to manually render the table
      this.rerender();
    });
  }


  cargarSubMarca(id: any) {
    this._trademark.obtenerSubMarca(id).subscribe((submarcas: any) => {
      this.submarcas = submarcas.data;
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


  ver(stat: any, unidad: any, modal: any) {
    this.isSubmit = false;
    this.status = '';
    switch (stat) {
      case 'new':
        this.mar = new Marca('', '');
        this.status = stat;
        break;
      case 'update':
        this.mar = unidad;
        this.status = stat;
        break;
      case 'submarca':
        this.mar = unidad;
        this.cargarSubMarca(this.mar.idmarca);
        this.status = stat;
        break;
    }
    this.modalReference = this.modalService.open(modal, {
      size: 'xl',
      centered: true,
    });
  }


  guardar() {
    switch (this.status) {
      case 'new':
        this._trademark.insertarDatosMarca(this.mar).subscribe((data: any) => {
          this.data = data;
          if (this.data.code === 200) {
            this.Toast.fire({
              icon: 'success',
              title: this.data.data,
            });
            this.status = '';
            this.mar = null;
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
        const id = this.mar.idmarca;
        this._trademark.actualizarDatosMarca(id, this.mar)
          .subscribe((data: any) => {
            this.data = data;
            if (this.data.code === 200) {
              this.Toast.fire({
                icon: 'success',
                title: this.data.data,
              });
              this.status = '';
              this.mar = null;
              this.cerrar();
            } else if (this.data.code === 400) {
              this.Toast.fire({
                icon: 'error',
                title: this.data.data,
              });
            }
          });
        break;
      case 'submarca':
        const id2 = this.mar.idmarca;
        const subma = this.submar;
        this._trademark.insertarDatosSubMarca(id2, subma)
          .subscribe((data: any) => {
            this.data = data;
            if (this.data.code === 200) {
              this.Toast.fire({
                icon: 'success',
                title: this.data.data,
              });
              this.status = 'submarca';
              this.submar = null;
              this.cargarSubMarca(id2);
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
