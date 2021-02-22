import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WharehouseComponent } from './wharehouse.component';

const routes: Routes = [{ path: '', component: WharehouseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WharehouseRoutingModule { }
