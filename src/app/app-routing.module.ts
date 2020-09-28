import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'onboardingpage', pathMatch: 'full'},
 
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'preferedaction',
    loadChildren: () => import('./preferedaction/preferedaction.module').then( m => m.PreferedactionPageModule)
  },
  {
    path: 'loginsigninoptions',
    loadChildren: () => import('./loginsigninoptions/loginsigninoptions.module').then( m => m.LoginsigninoptionsPageModule)
  },
  {
    path: 'onboardingpage',
    loadChildren: () => import('./onboardingpage/onboardingpage.module').then( m => m.OnboardingpagePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,onSameUrlNavigation:'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
