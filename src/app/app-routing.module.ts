
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './_services/auth-guard.service';
const routes: Routes = [
//  {path: '', redirectTo: 'home', pathMatch: 'full'},
  // {path: '', redirectTo: 'international-delivery', pathMatch: 'full'},
//  {path: '', redirectTo: 'localdelivery/payment', pathMatch: 'full'},
//  {path: '', redirectTo: 'localdelivery/bookingoptions', pathMatch: 'full'},
 {path: '', redirectTo: 'localdelivery', pathMatch: 'full'},
 
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard]
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
  },
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'customerspartneroption',
    loadChildren: () => import('./customerspartneroption/customerspartneroption.module').then( m => m.CustomerspartneroptionPageModule)
  },
  {
    path: 'localdelivery',
    loadChildren: () => import('./localdelivery/localdelivery.module').then( m => m.LocaldeliveryPageModule)
  },
  {
    path: 'providephone',
    loadChildren: () => import('./providephone/providephone.module').then( m => m.ProvidephonePageModule)
  },
  {
    path: 'otpvalidation',
    loadChildren: () => import('./otpvalidation/otpvalidation.module').then( m => m.OtpvalidationPageModule)
  },
  {
    path: 'profilepage',
    loadChildren: () => import('./profilepage/profilepage.module').then( m => m.ProfilepagePageModule)
  },
  {
    path: 'addprimarylocation',
    loadChildren: () => import('./addprimarylocation/addprimarylocation.module').then( m => m.AddprimarylocationPageModule)
  },
  {
    path: 'international-delivery',
    loadChildren: () => import('./international-delivery/international-delivery.module').then( m => m.InternationalDeliveryPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,onSameUrlNavigation:'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}