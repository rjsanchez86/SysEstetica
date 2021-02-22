import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsalesRoutingModule } from './listsales-routing.module';
import { ListsalesComponent } from './listsales.component';
import { SharedModule } from '../../../theme/shared/shared.module';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [ListsalesComponent],
  imports: [
    CommonModule,
    ListsalesRoutingModule,
    SharedModule,
    DataTablesModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    NgxPrintModule
  ]
})
export class ListsalesModule { }
