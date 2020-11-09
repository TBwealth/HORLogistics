import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiderroutePage } from './riderroute.page';

const routes: Routes = [
  {
    path: '',
    component: RiderroutePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiderroutePageRoutingModule {}
