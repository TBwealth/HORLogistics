import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreferedactionPage } from './preferedaction.page';

const routes: Routes = [
  {
    path: '',
    component: PreferedactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferedactionPageRoutingModule {}
