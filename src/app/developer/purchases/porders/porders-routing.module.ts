import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PordersComponent } from './porders.component';

const routes: Routes = [{ path: '', component: PordersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PordersRoutingModule { }
