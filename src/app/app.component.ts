import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";

import { Badge } from '@ionic-native/badge/ngx'; 
import { NetworkProvider } from "./_services/network";
import { AuthenticationService } from './_services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home-outline'
    },
    {
      title: 'Orders',
      url: '/order',
      icon: 'receipt-outline'
    },
    {
      title: 'Payments',
      url: '/payment',
      icon: 'cash-outline'
    },
    {
      title: 'Track',
      url: '/trackorder',
      icon: 'aperture-outline'
    },
    {
      title: 'Help Center',
      url: '/support',
      icon: 'headset-outline'
    },
   
  ];
  constructor(
    private fbaseService: FirebaseX,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private network: NetworkProvider,
    private menu: MenuController,
    private AuthenService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }
logout(){
this.AuthenService.clearusers();
this.router.navigate(['preferedaction']);
}
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.network.checkNetwork();      
    });
  }
  closeMenu(){
this.menu.close();
  }
  async getToken(){
    let token;
    if(this.platform.is('android')){
      token = await this.fbaseService.getToken()
    }
    if(this.platform.is('ios')){
      token = await this.fbaseService.getToken();
      await this.fbaseService.grantPermission();
    }
  }
}
