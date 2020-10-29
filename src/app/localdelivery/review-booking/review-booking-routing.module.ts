import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewBookingPage } from './review-booking.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewBookingPageRoutingModule {}
