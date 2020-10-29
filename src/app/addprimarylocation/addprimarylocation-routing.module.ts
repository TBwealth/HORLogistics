import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddprimarylocationPage } from './addprimarylocation.page';

const routes: Routes = [
  {
    path: '',
    component: AddprimarylocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddprimarylocationPageRoutingModule {}
