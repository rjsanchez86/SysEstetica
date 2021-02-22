import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PordersRoutingModule } from './porders-routing.module';
import { PordersComponent } from './porders.component';
import { SharedModule } from '../../../theme/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [PordersComponent],
  imports: [
    CommonModule,
    PordersRoutingModule,
    SharedModule,
    DataTablesModule,
    FormsModule,
    NgbModule,
    TagInputModule,
    NgSelectModule
  ]
})
export class PordersModule { }
