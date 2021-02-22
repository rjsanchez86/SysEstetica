import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GreportComponent } from './greport.component';

const routes: Routes = [{ path: '', component: GreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GreportRoutingModule { }
