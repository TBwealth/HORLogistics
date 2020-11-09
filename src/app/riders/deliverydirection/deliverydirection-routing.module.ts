import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliverydirectionPage } from './deliverydirection.page';

const routes: Routes = [
  {
    path: '',
    component: DeliverydirectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliverydirectionPageRoutingModule {}
