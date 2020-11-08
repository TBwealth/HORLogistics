import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";

import { Badge } from '@ionic-native/badge/ngx'; 
import { NetworkProvider } from "./_services/network";
import { AuthenticationService } from './_services/authentication.service';
import { Router } from '@angular/router';
import {  LoginResource} from "./_models/service-models";

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
      url: '/orders',
      icon: 'receipt-outline'
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
  usersdata: any;
  userRole = "";
  userType = "";
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
      this.getUser();   
    });
  }
  gotoprofile(){
    this.router.navigate(['profilepage']);
    this.menu.close();
  }
  getUser(){
    this.AuthenService.getuser().then(async (usersdata:any[])=>{
      if(usersdata.length > 0){
        this.usersdata = usersdata[0];
        this.userRole = this.usersdata.role[0].name;
        this.userType = this.usersdata.user.userType;
      }
    });
  }
  gotoabout(){
    this.router.navigate(['aboutus']);
  }
  gotoprivacypolicy(){
    this.router.navigate(['privacypolicy']);
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
