import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GreportRoutingModule } from './greport-routing.module';
import { GreportComponent } from './greport.component';
import { SharedModule } from '../../../theme/shared/shared.module';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [GreportComponent],
  imports: [
    CommonModule,
    GreportRoutingModule,
    SharedModule,
    DataTablesModule,
    FormsModule,
    NgbModule
  ]
})
export class GreportModule { }
