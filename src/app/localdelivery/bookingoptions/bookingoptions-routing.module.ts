import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingoptionsPage } from './bookingoptions.page';

const routes: Routes = [
  {
    path: '',
    component: BookingoptionsPage
  },
  {
    path: 'singleorder',
    loadChildren: () => import('./singleorder/singleorder.module').then( m => m.SingleorderPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingoptionsPageRoutingModule {}
