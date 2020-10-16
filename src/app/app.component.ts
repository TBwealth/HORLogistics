import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import { FCM } from '@ionic-native/fcm/';
import { Badge } from '@ionic-native/badge/ngx'; 
import { NetworkProvider } from "./_services/network";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private fbaseService: Firebase,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private network: NetworkProvider,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.network.checkNetwork();      
    });
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
