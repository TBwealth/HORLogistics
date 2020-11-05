import { TodayPage } from './today/today.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummaryPage } from './summary.page';

const routes: Routes = [
  {
    path: '',
    component: SummaryPage,
    children: [
      {
        path: '',
        component: TodayPage
      },
      {
        path: 'weekly',
        loadChildren: () => import('./weekly/weekly.module').then( m => m.WeeklyPageModule)
      },
      {
        path: 'today',
        loadChildren: () => import('./today/today.module').then( m => m.TodayPageModule)
      }

    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummaryPageRoutingModule {}
