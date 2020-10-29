import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {environment} from './environment'

//PLUGIN
import { IonicStorageModule  } from '@ionic/storage';
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
import { AuthService } from './_services/auth.service';
import { AuthGuardService } from './_services/auth-guard.service';
import { AuthenticationService } from './_services/authentication.service';
import { JwtInterceptor } from './_services/jwt.interceptor';
import { AccountServiceProxy } from './_services/service-proxies';
import { PageStructureComponent } from './components/page-structure/page-structure.component';

@NgModule({
  declarations: [AppComponent,
    // PageStructureComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,IonicStorageModule.forRoot()
  ],
  providers: [
    IonicStorageModule,
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
    AuthService,
    AuthGuardService,
    AuthenticationService,
    AccountServiceProxy,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
