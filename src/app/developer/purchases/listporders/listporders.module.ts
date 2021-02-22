import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListpordersRoutingModule } from './listporders-routing.module';
import { ListpordersComponent } from './listporders.component';
import { SharedModule } from '../../../theme/shared/shared.module';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [ListpordersComponent],
  imports: [
    CommonModule,
    ListpordersRoutingModule,
    SharedModule,
    DataTablesModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    NgxPrintModule
  ]
})
export class ListpordersModule { }
