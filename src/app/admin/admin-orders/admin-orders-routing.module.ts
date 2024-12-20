import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminOrdersPage } from './admin-orders.page';

const routes: Routes = [
  {
    path: '',
    component: AdminOrdersPage,
  },
  {
    path: 'allorders',
    loadChildren: () => import('./allorders/allorders.module').then( m => m.AllordersPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminOrdersPageRoutingModule {}
