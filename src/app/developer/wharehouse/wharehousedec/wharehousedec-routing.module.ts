import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WharehousedecComponent } from './wharehousedec.component';

const routes: Routes = [{ path: '', component: WharehousedecComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WharehousedecRoutingModule { }
