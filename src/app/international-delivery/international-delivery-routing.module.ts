import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternationalDeliveryPage } from './international-delivery.page';

const routes: Routes = [
  {
    path: '',
    component: InternationalDeliveryPage
  },
  {
    path: 'export',
    component: InternationalDeliveryPage
  },
  {
    path: 'summary',
    loadChildren: () => import('./summary/summary.module').then( m => m.SummaryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternationalDeliveryPageRoutingModule {}
