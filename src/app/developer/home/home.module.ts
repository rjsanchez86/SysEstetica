import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../theme/shared/shared.module';

import { HomeService } from './service/home.service';
import { XsegundoService } from './service/xsegundo.service';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    DataTablesModule,
    FormsModule,
    NgbModule,
    TagInputModule,
    NgSelectModule,
    NgxPrintModule
  ],
  providers: [XsegundoService, , HomeService]
})
export class HomeModule { }
