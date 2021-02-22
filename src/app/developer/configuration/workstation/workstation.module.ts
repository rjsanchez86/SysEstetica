import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkstationRoutingModule } from './workstation-routing.module';
import { WorkstationComponent } from './workstation.component';
import { SharedModule } from '../../../theme/shared/shared.module';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [WorkstationComponent],
  imports: [
    CommonModule,
    WorkstationRoutingModule,
    DataTablesModule,
    SharedModule,
    FormsModule,
    NgbModule
  ]
})
export class WorkstationModule { }
