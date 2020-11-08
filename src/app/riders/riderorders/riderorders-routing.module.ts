import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiderordersPage } from './riderorders.page';

const routes: Routes = [
  {
    path: '',
    component: RiderordersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiderordersPageRoutingModule {}
