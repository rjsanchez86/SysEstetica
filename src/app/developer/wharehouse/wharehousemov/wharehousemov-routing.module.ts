import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WharehousemovComponent } from './wharehousemov.component';

const routes: Routes = [{ path: '', component: WharehousemovComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WharehousemovRoutingModule { }
