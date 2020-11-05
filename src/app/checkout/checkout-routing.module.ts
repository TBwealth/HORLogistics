import { RatingsComponent } from './ratings/ratings.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutPage } from './checkout.page';

const routes: Routes = [
  {
    path: '',
    component: CheckoutPage
  },
  {
    path: 'single',
    loadChildren: () => import('./single/single.module').then( m => m.SinglePageModule)
  },
  {
    path: 'multiple',
    loadChildren: () => import('./multiple/multiple.module').then( m => m.MultiplePageModule)
  },
  {
    path: 'rating',
    component: RatingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutPageRoutingModule {}
