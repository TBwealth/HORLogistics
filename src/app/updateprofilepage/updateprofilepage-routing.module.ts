import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateprofilepagePage } from './updateprofilepage.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateprofilepagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateprofilepagePageRoutingModule {}
