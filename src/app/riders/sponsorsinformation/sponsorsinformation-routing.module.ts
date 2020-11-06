import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SponsorsinformationPage } from './sponsorsinformation.page';

const routes: Routes = [
  {
    path: '',
    component: SponsorsinformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SponsorsinformationPageRoutingModule {}
