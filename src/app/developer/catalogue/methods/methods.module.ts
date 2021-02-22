import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MethodsRoutingModule } from './methods-routing.module';
import { MethodsComponent } from './methods.component';
import { SharedModule } from '../../../theme/shared/shared.module';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [MethodsComponent],
  imports: [
    CommonModule,
    MethodsRoutingModule,
    DataTablesModule,
    SharedModule,
    FormsModule,
    NgbModule
  ]
})
export class MethodsModule { }
