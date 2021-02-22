import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MethodsComponent } from './methods.component';

const routes: Routes = [{ path: '', component: MethodsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MethodsRoutingModule { }
