import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocaldeliveryPage } from './localdelivery.page';

const routes: Routes = [
  {
    path: '',
    component: LocaldeliveryPage
  },
  {
    path: 'single',
    component: LocaldeliveryPage
  },
  {
    path: 'bookingoptions',
    loadChildren: () => import('./bookingoptions/bookingoptions.module').then( m => m.BookingoptionsPageModule)
  },
  {
    path: 'confirm-booking',
    loadChildren: () => import('./confirm-booking/confirm-booking.module').then( m => m.ConfirmBookingPageModule)
  },
  {
    path: 'review-booking',
    loadChildren: () => import('./review-booking/review-booking.module').then( m => m.ReviewBookingPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocaldeliveryPageRoutingModule {}
