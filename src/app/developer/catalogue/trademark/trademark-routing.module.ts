import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrademarkComponent } from './trademark.component';

const routes: Routes = [{ path: '', component: TrademarkComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrademarkRoutingModule { }
