import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from './service/profile.service';
import { Perfil } from './models/profile';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger = new Subject();
  perfiles: Perfil;
  per: Perfil;
  status: any;
  modalReference = null;
  permisos: any;
  PermisosId: any = [];
  permi: any = [];
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

  constructor(private _perfil: ProfileService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refrescarTabla();
  }


  refrescarTabla() {
    this.cargarDTOpciones();
    this.cargarPerfiles();
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


  cargarPerfiles() {
    this._perfil.obtenerPerfil()
      .subscribe((perfiles: any) => {
        this.perfiles = perfiles.data;
        // Calling the DT trigger to manually render the table
        this.rerender();
      });
  }


  cargarPaginas() {
    this._perfil.obtenerPaginas()
      .subscribe((permisos: any) => {
        this.permisos = permisos.data;
      });
  }


  obtenerDato(event: any, tipo: any) {
    switch (tipo) {
      case 'permis':
        this.permi = [];
        this.permi.push(event);
        break;
    }
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

  ver(status: any, perfil: any, modal: any) {
    this.status = '';
    this.cargarPaginas();
    let mat: any;
    switch (status) {
      case 'new':
        this.status = status;
        this.per = new Perfil('','', '');
        break;
      case 'update':
        this.status = status;
        this.per = perfil;
        mat = this.per.permisos.split(',');
       this.PermisosId =  mat;
        break;
    }
    this.modalReference = this.modalService.open(modal, { size: 'md', centered: true });
  }




  cerrar() {
    this.modalReference.close();
    this.refrescarTabla();
  }

  guardar(){
    this.per.permisos = this.PermisosId.toString();
    switch (this.status) {
      case 'new':
        this._perfil.insertarDatosPerfil(this.per)
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
        break;
      case 'update':
        const id = this.per.idperfil;
        this._perfil.actualizarDatosPerfil(id, this.per)
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
        break;
    }

  }
}
