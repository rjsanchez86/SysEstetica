import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WharehouselistRoutingModule } from './wharehouselist-routing.module';
import { WharehouselistComponent } from './wharehouselist.component';
import { SharedModule } from '../../../theme/shared/shared.module';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [WharehouselistComponent],
  imports: [
    CommonModule,
    WharehouselistRoutingModule,
    SharedModule,
    DataTablesModule,
    FormsModule,
    NgbModule
  ]
})
export class WharehouselistModule { }
