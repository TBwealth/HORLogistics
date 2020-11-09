import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignedOrdersPage } from './assigned-orders.page';

const routes: Routes = [
  {
    path: '',
    component: AssignedOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignedOrdersPageRoutingModule {}
