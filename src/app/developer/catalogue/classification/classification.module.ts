import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassificationRoutingModule } from './classification-routing.module';
import { ClassificationComponent } from './classification.component';
import { SharedModule } from '../../../theme/shared/shared.module';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ClassificationComponent],
  imports: [
    CommonModule,
    ClassificationRoutingModule,
    DataTablesModule,
    SharedModule,
    FormsModule,
    NgbModule
  ]
})
export class ClassificationModule { }
