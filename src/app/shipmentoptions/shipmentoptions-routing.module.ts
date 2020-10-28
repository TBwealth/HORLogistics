import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShipmentoptionsPage } from './shipmentoptions.page';

const routes: Routes = [
  {
    path: '',
    component: ShipmentoptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipmentoptionsPageRoutingModule {}
