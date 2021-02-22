import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsersService } from './service/users.service';
import { Usuarios, Personal, Perfil, Estatus } from './models/users';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger = new Subject();
  usuarios: Usuarios;
  usu: Usuarios;
  personal: Personal;
  perfiles: Perfil;
  status: any;
  modalReference = null;
  form: any;
  isSubmit: boolean;
  data: any;
  opcion: boolean;
  estatusS: Estatus;
  sucursales: any;
  SucursalId: any = [];
  sucur: any = [];
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

  constructor(private _usuarios: UsersService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refrescarTabla();
  }


  refrescarTabla() {
    this.cargarDTOpciones();
    this.cargarUsuario();
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


  cargarUsuario() {
    this._usuarios.obtenerUsuarios()
      .subscribe((usuario: any) => {
        this.usuarios = usuario.data;
        // Calling the DT trigger to manually render the table
        this.rerender();
      });
  }


  cargarPersonal() {
    this._usuarios.obtenerPersonal()
      .subscribe((personal: any) => {
        this.personal = personal.data;
      });
  }


  cargarSucursal() {
    this._usuarios.obtenerSucursal()
      .subscribe((sucursales: any) => {
        this.sucursales = sucursales.data;
      });
  }


  cargarSucursal2(sucursal: any) {
    let mat: any;
    this._usuarios.obtenerSucursal()
      .subscribe((sucursales: any) => {
        this.sucursales = sucursales.data;
        mat = sucursal.split(',');
       this.SucursalId =  mat;
      });
  }


  cargarPerfil() {
    this._usuarios.obtenerPerfil()
      .subscribe((perfiles: any) => {
        this.perfiles = perfiles.data;
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


  ver(status: any, usuarios: any, modal: any) {
    this.isSubmit = false;
    this.status = '';
    this.cargarPersonal();
    this.cargarPerfil();
    switch (status) {
      case 'new':
        this.cargarSucursal();
        this.opcion = false;
        this.SucursalId = '0';
        this.usu = new Usuarios('', 0, 0, '', '', '', '', '', '', '', '', '', '');
        this.status = status;
        break;
      case 'update':
        this.opcion = true;
        this.SucursalId = '0';
        this.usu = usuarios;
        this.usu.password2 = this.usu.password;
        this.cargarSucursal2(this.usu.sucursal);
        this.status = status;
        break;
    }
    this.modalReference = this.modalService.open(modal, { size: 'md', centered: true });
  }


  cerrar() {
    this.modalReference.close();
    this.refrescarTabla();
  }


  obtenerDato(event: any, tipo: any) {
    switch (tipo) {
      case 'sucur':
        this.sucur = [];
        this.sucur.push(event);
        break;
    }
  }

  async estatus(usuario: any) {
    let sta = usuario.estatus;

    const { value: accept } = await Swal.fire({
      title: '¿Deseas cambiar el estatus de ' + usuario.nombre + '?',
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
      this._usuarios.actualizarEstatusUsuarios(usuario.idseguridad, this.estatusS)
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
    this.usu.sucursal = this.SucursalId.toString();
    switch (this.status) {
      case 'new':
        this._usuarios.insertarDatosUsuarios(this.usu)
          .subscribe((data: any) => {
            this.data = data;
            if (this.data.code === 200) {
              this.Toast.fire({
                icon: 'success',
                title: this.data.data
              });
              this.status = '';
              this.usu = null;
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
        const id = this.usu.idseguridad;
        this._usuarios.actualizarDatosUsuarios(id, this.usu)
          .subscribe((data: any) => {
            this.data = data;
            if (this.data.code === 200) {
              this.Toast.fire({
                icon: 'success',
                title: this.data.data
              });
              this.status = '';
              this.usu = null;
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
