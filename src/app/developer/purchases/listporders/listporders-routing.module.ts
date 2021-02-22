import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListpordersComponent } from './listporders.component';

const routes: Routes = [{ path: '', component: ListpordersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListpordersRoutingModule { }
