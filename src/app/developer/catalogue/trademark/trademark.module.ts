import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrademarkRoutingModule } from './trademark-routing.module';
import { TrademarkComponent } from './trademark.component';
import { SharedModule } from '../../../theme/shared/shared.module';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [TrademarkComponent],
  imports: [
    CommonModule,
    TrademarkRoutingModule,
    SharedModule,
    DataTablesModule,
    FormsModule,
    NgbModule
  ]
})
export class TrademarkModule { }
