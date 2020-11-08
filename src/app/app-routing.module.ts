import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './_services/auth-guard.service';

const routes: Routes = [
 
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
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
  },
  {
    path: 'updateprofilepage',
    loadChildren: () => import('./updateprofilepage/updateprofilepage.module').then( m => m.UpdateprofilepagePageModule)
  },
  {
    path: 'trackorder',
    loadChildren: () => import('./trackorder/trackorder.module').then( m => m.TrackorderPageModule)
  },
  {
    path: 'tripdetails',
    loadChildren: () => import('./trackorder/tripdetails/tripdetails.module').then( m => m.TripdetailsPageModule)
  },
  {
    path: 'allchats',
    loadChildren: () => import('./allchats/allchats.module').then( m => m.AllchatsPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./allchats/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'helpcenter',
    loadChildren: () => import('./allchats/helpcenter/helpcenter.module').then( m => m.HelpcenterPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },

  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./about/aboutus/aboutus.module').then( m => m.AboutusPageModule)
  },
  {
    path: 'privacypolicy',
    loadChildren: () => import('./about/privacypolicy/privacypolicy.module').then( m => m.PrivacypolicyPageModule)
  },
  {
    path: 'promocode',
    loadChildren: () => import('./payment/promocode/promocode.module').then( m => m.PromocodePageModule)
  },
  {
    path: 'documentupload',
    loadChildren: () => import('./riders/documentupload/documentupload.module').then( m => m.DocumentuploadPageModule)
  },
  {
    path: 'sponsorsinformation',
    loadChildren: () => import('./riders/sponsorsinformation/sponsorsinformation.module').then( m => m.SponsorsinformationPageModule)
  },
  {
    path: 'ridershistory',
    loadChildren: () => import('./riders/ridershistory/ridershistory.module').then( m => m.RidershistoryPageModule)
  },
  {
    path: 'riderorders',
    loadChildren: () => import('./riders/riderorders/riderorders.module').then( m => m.RiderordersPageModule)
  }






];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,onSameUrlNavigation:'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}