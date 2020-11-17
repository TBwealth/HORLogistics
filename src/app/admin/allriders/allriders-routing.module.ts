import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllridersPage } from './allriders.page';

const routes: Routes = [
  {
    path: '',
    component: AllridersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllridersPageRoutingModule {}
