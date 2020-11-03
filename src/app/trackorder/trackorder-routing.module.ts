import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackorderPage } from './trackorder.page';

const routes: Routes = [
  {
    path: '',
    component: TrackorderPage
  },
  {
    path: 'pickup',
    loadChildren: () => import('./pickup/pickup.module').then( m => m.PickupPageModule)
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackorderPageRoutingModule {}
