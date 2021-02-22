import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventorymRoutingModule } from './inventorym-routing.module';
import { InventorymComponent } from './inventorym.component';
import { SharedModule } from '../../../theme/shared/shared.module';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [InventorymComponent],
  imports: [
    CommonModule,
    InventorymRoutingModule,
    SharedModule,
    DataTablesModule,
    FormsModule,
    NgbModule
  ]
})
export class InventorymModule { }
