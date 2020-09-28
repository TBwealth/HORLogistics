import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnboardingpagePage } from './onboardingpage.page';

const routes: Routes = [
  {
    path: '',
    component: OnboardingpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingpagePageRoutingModule {}
