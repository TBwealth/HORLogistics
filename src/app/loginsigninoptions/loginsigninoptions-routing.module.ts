import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginsigninoptionsPage } from './loginsigninoptions.page';

const routes: Routes = [
  {
    path: '',
    component: LoginsigninoptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginsigninoptionsPageRoutingModule {}
