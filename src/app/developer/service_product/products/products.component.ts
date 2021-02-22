import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from './service/products.service';
import { Products, Proveedor, Marca, SubMarca } from './models/products';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  productos: Products;
  prod: Products;
  proveedor: Proveedor;
  marca: Marca;
  submarca: SubMarca;
  modalReference = null;
  form: any;
  isSubmit: boolean;
  status: any;
  data: any;
  porcentaje: any = 1;
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


  constructor(private _products: ProductsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refrescarTabla();
  }


  refrescarTabla() {
    this.cargarDTOpciones();
    this.cargarServicios();
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


  cargarServicios() {
    this._products.obtenerDatosProducts().subscribe((productos: any) => {
      this.productos = productos.data;
      // Calling the DT trigger to manually render the table
      this.rerender();
    });
  }


  cargarProveedor() {
    this._products.obtenerDatosProveedor().subscribe((proveedor: any) => {
      this.proveedor = proveedor.data;
    });
  }


  cargarMarca() {
    this._products.obtenerDatosMarca().subscribe((marca: any) => {
      this.marca = marca.data;
    });
  }


  obtenerSubMarca(marca: any) {
    this._products.obtenerDatosSubMarca(marca).subscribe((submarca: any) => {
      this.submarca = submarca.data;
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


  ver(stat: any, producto: any, modal: any) {
    this.cargarProveedor();
    this.cargarMarca();
    this.isSubmit = false;
    this.status = '';
    switch (stat) {
      case 'new':
        this.prod = new Products('', '2', '1', '', '0', '', '', '0', '', '0', '', '', '', '', '', 0, 0, '', '', '');
        this.status = stat;
        break;
      case 'update':
        this.prod = producto;
        this.obtenerSubMarca(this.prod.idmarca);
        this.status = stat;
        break;
      case 'view':
        this.prod = producto;
        this.status = stat;
        break;
      case 'increase':
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
        this._products.insertarDatosProducts(this.prod)
          .subscribe((data: any) => {
            this.data = data;
            if (this.data.code === 200) {
              this.Toast.fire({
                icon: 'success',
                title: this.data.data
              });
              this.status = '';
              this.prod = null;
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
        const id = this.prod.idarticulo;
        this._products.actualizarDatosProducts(id, this.prod)
          .subscribe((data: any) => {
            this.data = data;
            if (this.data.code === 200) {
              this.Toast.fire({
                icon: 'success',
                title: this.data.data
              });
              this.status = '';
              this.prod = null;
              this.cerrar();
            } else if (this.data.code === 400) {
              this.Toast.fire({
                icon: 'error',
                title: this.data.data
              });
            }
          });
        break;
      case 'increase':
        const porcen = this.porcentaje;
        this._products.porcentajeDatosProducts(porcen)
          .subscribe((data: any) => {
            this.data = data;
            if (this.data.code === 200) {
              this.Toast.fire({
                icon: 'success',
                title: this.data.data
              });
              this.status = '';
              this.porcentaje = null;
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
