import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryTypePage } from './delivery-type.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryTypePageRoutingModule {}
