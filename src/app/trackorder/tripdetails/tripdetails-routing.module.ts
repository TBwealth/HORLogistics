import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripdetailsPage } from './tripdetails.page';

const routes: Routes = [
  {
    path: '',
    component: TripdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripdetailsPageRoutingModule {}
