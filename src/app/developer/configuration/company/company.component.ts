import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from './service/company.service';
import { Company } from './models/company';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  empresas: Company;
  emp: Company;
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

      toast.addEventListener('mouseenter', Swal.stopTimer)

      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  });


  constructor(private _company: CompanyService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refrescarTabla();
  }


  refrescarTabla(){
    this.cargarDTOpciones();
    this.cargarEmpresas();
  }


  cargarDTOpciones(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json',
      },
      processing: true,
      order: [[ 0, 'asc' ]],
      responsive: false,
    };
  }


  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }


  cargarEmpresas(){
    this._company.obtenerDatosCompanys()
      .subscribe((empresa: any) => {
        this.empresas = empresa.data;
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


  cerrar(){
    this.modalReference.close();
    this.refrescarTabla();
  }


  ver(stat: any, empresa: any, modal: any){
    this.isSubmit = false;
    this.status = '';
    if (stat === 'new'){
      this.emp = new Company('', '', '', '', '', '', '', '', '', '', '', '', '', '');
      this.status = stat;
    }
    if (stat === 'update'){
      this.emp = empresa;
      this.status = stat;
    }
    if (stat === 'view'){
      this.emp = empresa;
      this.status = stat;
    }
    this.modalReference = this.modalService.open(modal, { size: 'xl', centered: true });
  }


  guardar(){
      if (this.status === 'new'){
        this._company.insertarDatosCompany(this.emp)
        .subscribe((data: any) => {
          this.data = data;
          if (this.data.code === 200){
            this.Toast.fire({
              icon: 'success',
              title: this.data.data
            });
            this.status = '';
            this.emp = null;
            this.cerrar();
          }else if (this.data.code === 400){
            this.Toast.fire({
              icon: 'error',
              title: this.data.data
            });
          }
        });
      }else if (this.status === 'update'){
      const id = this.emp.idempresa;
      this._company.actualizarDatosCompany(id, this.emp)
      .subscribe((data: any) => {
        this.data = data;
        if (this.data.code === 200){
          this.Toast.fire({
            icon: 'success',
            title: this.data.data
          });
          this.status = '';
          this.emp = null;
          this.cerrar();
        }else if (this.data.code === 400){
          this.Toast.fire({
            icon: 'error',
            title: this.data.data
          });
        }
      });
      }
  }
}
