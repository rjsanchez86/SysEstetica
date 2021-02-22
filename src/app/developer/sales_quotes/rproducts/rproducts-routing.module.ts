import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RproductsComponent } from './rproducts.component';

const routes: Routes = [{ path: '', component: RproductsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RproductsRoutingModule { }
