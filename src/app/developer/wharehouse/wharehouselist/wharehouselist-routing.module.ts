import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WharehouselistComponent } from './wharehouselist.component';

const routes: Routes = [{ path: '', component: WharehouselistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WharehouselistRoutingModule { }
