import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {environment} from './environment'

//PLUGIN
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Network } from '@ionic-native/network/ngx';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';

//SERVICES
import { CountryserviceService } from './_services/countryservice.service';
import { NetworkProvider } from './_services/network';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [
    HttpClient,
    StatusBar,
    SplashScreen,
    Firebase,
    FCM,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CountryserviceService,
    NetworkProvider,
    Device,
    Network,
    FirebaseAuthentication,
    GooglePlus,
    Facebook,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
