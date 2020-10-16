import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProvidephonePage } from './providephone.page';

const routes: Routes = [
  {
    path: '',
    component: ProvidephonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProvidephonePageRoutingModule {}
