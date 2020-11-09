import { AssignedOrdersPage } from './assigned-orders/assigned-orders.page';
import { PendingOrdersPage } from './pending-orders/pending-orders.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminOrdersPage } from './admin-orders.page';

const routes: Routes = [
  {
    path: '',
    component: AdminOrdersPage,
    children: [
      {
        path: '',
        component: PendingOrdersPage,
      },

      {
        path: 'assigned-orders',
        loadChildren: () => import('./assigned-orders/assigned-orders.module').then( m => m.AssignedOrdersPageModule)
      },
      {
        path: 'pending-orders',
        loadChildren: () => import('./pending-orders/pending-orders.module').then( m => m.PendingOrdersPageModule)
      },
      
    
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminOrdersPageRoutingModule {}
