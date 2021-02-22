import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListsalesComponent } from './listsales.component';

const routes: Routes = [{ path: '', component: ListsalesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsalesRoutingModule { }
