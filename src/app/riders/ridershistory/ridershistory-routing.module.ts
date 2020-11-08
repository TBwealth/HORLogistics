import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RidershistoryPage } from './ridershistory.page';

const routes: Routes = [
  {
    path: '',
    component: RidershistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RidershistoryPageRoutingModule {}
