import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventorymComponent } from './inventorym.component';

const routes: Routes = [{ path: '', component: InventorymComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventorymRoutingModule { }
