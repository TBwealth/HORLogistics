import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllqueriesPage } from './allqueries.page';

const routes: Routes = [
  {
    path: '',
    component: AllqueriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllqueriesPageRoutingModule {}
