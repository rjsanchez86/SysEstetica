import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkstationComponent } from './workstation.component';

const routes: Routes = [{ path: '', component: WorkstationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkstationRoutingModule { }
