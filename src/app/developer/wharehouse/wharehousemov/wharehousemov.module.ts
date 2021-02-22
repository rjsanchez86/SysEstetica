import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WharehousemovRoutingModule } from './wharehousemov-routing.module';
import { WharehousemovComponent } from './wharehousemov.component';
import { SharedModule } from '../../../theme/shared/shared.module';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [WharehousemovComponent],
  imports: [
    CommonModule,
    WharehousemovRoutingModule,
    SharedModule,
    DataTablesModule,
    FormsModule,
    NgbModule,
    TagInputModule,
    NgSelectModule
  ]
})
export class WharehousemovModule { }
