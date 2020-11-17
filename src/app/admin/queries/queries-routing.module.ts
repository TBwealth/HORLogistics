import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueriesPage } from './queries.page';

const routes: Routes = [
  {
    path: '',
    component: QueriesPage
  },
  {
    path: 'allqueries',
    loadChildren: () => import('./allqueries/allqueries.module').then( m => m.AllqueriesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueriesPageRoutingModule {}
