import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocaldeliveryPage } from './localdelivery.page';

const routes: Routes = [
  {
    path: '',
    component: LocaldeliveryPage
  },  {
    path: 'bookingoptions',
    loadChildren: () => import('./bookingoptions/bookingoptions.module').then( m => m.BookingoptionsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocaldeliveryPageRoutingModule {}
