import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WharehouseRoutingModule } from './wharehouse-routing.module';
import { WharehouseComponent } from './wharehouse.component';
import { SharedModule } from '../../../theme/shared/shared.module';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [WharehouseComponent],
  imports: [
    CommonModule,
    WharehouseRoutingModule,
    SharedModule,
    DataTablesModule,
    FormsModule,
    NgbModule
  ]
})
export class WharehouseModule { }
