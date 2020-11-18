import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutsummaryPage } from './checkoutsummary.page';

const routes: Routes = [
  {
    path: '',
    component: CheckoutsummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutsummaryPageRoutingModule {}
