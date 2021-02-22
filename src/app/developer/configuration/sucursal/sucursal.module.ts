import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SucursalRoutingModule } from './sucursal-routing.module';
import { SucursalComponent } from './sucursal.component';
import { SharedModule } from '../../../theme/shared/shared.module';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [SucursalComponent],
  imports: [
    CommonModule,
    SucursalRoutingModule,
    DataTablesModule,
    SharedModule,
    FormsModule,
    NgbModule
  ]
})
export class SucursalModule { }
