import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerspartneroptionPage } from './customerspartneroption.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerspartneroptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerspartneroptionPageRoutingModule {}
