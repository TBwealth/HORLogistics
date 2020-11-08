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
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Network } from '@ionic-native/network/ngx';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';


//SERVICES
import { CountryserviceService } from './_services/countryservice.service';
import { NetworkProvider } from './_services/network';
import { AuthService } from './_services/auth.service';
import { AuthGuardService } from './_services/auth-guard.service';
import { AuthenticationService } from './_services/authentication.service';
import { JwtInterceptor } from './_services/jwt.interceptor';
import { PageStructureComponent } from './components/page-structure/page-structure.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { LocalBookingServiceProxy,LocationsServiceProxy,AccountServiceProxy,RegisterServiceProxy,CountriesServiceProxy, ApiServiceProxy, ManageServiceProxy, InternationalbookingServiceProxy } from './_services/service-proxies';
import { ChatService } from './_services/chat.service';
import {MaprouteService} from './_services/maproute.service';
import { StoreService } from './_services/store.service';
import { InternationalBooking } from './_models/service-models';
@NgModule({
  declarations: [
    AppComponent,
    // CheckboxComponent
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
    FirebaseX,
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
    RegisterServiceProxy,
    CountriesServiceProxy,
    ApiServiceProxy,
    ChatService,
    ManageServiceProxy,
    Camera,
    File,
    MaprouteService,
    LocationsServiceProxy,
    StoreService,
    LocalBookingServiceProxy,
    InternationalbookingServiceProxy,
    FileOpener,
    FileChooser,
    FilePath,
    FileTransfer,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
