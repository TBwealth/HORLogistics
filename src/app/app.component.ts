import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";

import { Badge } from '@ionic-native/badge/ngx'; 
import { NetworkProvider } from "./_services/network";
import { AuthenticationService } from './_services/authentication.service';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import {customConfig} from "./custumConfig";
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
      icon: 'home-outline',
      userRole: ['AllUsers']
    },
    {
      title: 'Ride History',
      url: '/ridershistory',
      icon: 'reload-outline',
      userRole: ['Rider']
    },
    {
      title: 'Orders',
      url: '/orders',
      icon: 'receipt-outline',
      userRole: ['Customer']
    },
    {
      title: 'CheckOut Assistance',
      url: '/checkoutlist',
      icon: 'reader-outline',
      userRole: ['Customer','Partner']
    },
    {
      title: 'Assigned Orders',
      url: '/riderorders',
      icon: 'receipt-outline',
      userRole: ['Rider']
    },
  
    {
      title: 'Track',
      url: '/trackorder',
      icon: 'aperture-outline',
      userRole: ['AllUsers']
    },
    {
      title: 'Help Center',
      url: '/helpcenter',
      icon: 'headset-outline',
      userRole: ['AllUsers']
    },
    {
      title: 'Settings',
      url: '/profilepage',
      icon: 'settings-outline',
      userRole: ['AllUsers']
    },
   
  ];
  usersdata: any;
  userRole = "";
  userType = "";
  Urlbase = customConfig.baseUrl;
  constructor(
    private fbaseService: FirebaseX,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private network: NetworkProvider,
    private menu: MenuController,
    private AuthenService: AuthenticationService,
    private router: Router,
    public storage: Storage
  ) {
    this.initializeApp();
  }

logout(){
this.AuthenService.clearusers();
this.router.navigate(['preferedaction']);
}
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.network.checkNetwork();   
      this.getUser(); 
      this.getToken();
    });

    console.log(this.AuthenService.globalUser)
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
    let token = "web-jgjgjki-6675675-654544";
    this.storage.set('token', token)
    if(this.platform.is('android')){
      this.storage.remove('token');
      token = await this.fbaseService.getToken()
      this.storage.set('token', token)
    }
      if(this.platform.is('ios')){
        this.storage.remove('token');
        token = await this.fbaseService.getToken();
        await this.fbaseService.grantPermission();
        this.storage.set('token', token)
      }
    
    
  }
}
