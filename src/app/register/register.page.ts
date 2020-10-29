import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NavController, ToastController,Platform} from '@ionic/angular';
import { from } from 'rxjs';
import { User, socialUser} from "../_models/user";
import { RegisterUserVieModel,ObjectResourceOfRegisterUserResource,RegisterUserResource } from "../_models/service-models";
import {Router,ActivatedRoute} from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AuthenticationService } from '../_services/authentication.service';
import { AccountServiceProxy } from '../_services/service-proxies';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  signinSegment: boolean = true;
  signupSegment: boolean = false;
  regForm: FormGroup;
  responseData: any;
  user: socialUser;
  type: string;
  customerType: any;
  RegisterUserResource = new RegisterUserResource().clone();
  regUser = new RegisterUserVieModel().clone();
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  isGoogleLogin = false;
  loading: any;
    constructor(private router: Router,
      private navCtrl: NavController,
      private activatedroute: ActivatedRoute,
      private toastCtrl: ToastController,
      private AuthService: AuthService,
      private AuthenService: AuthenticationService,
      private registerService: AccountServiceProxy,
      private google: GooglePlus,
      private fireAuth: AngularFireAuth,
      private fb: Facebook,
      private platform: Platform,) { }


    async forgotPassword(){}
    gototerms(){
  this.router.navigate(['terms'])
    }
    goback(){
      this.navCtrl.back();
    }
    userlogin(){
      this.router.navigate(['login'])
    }
    getcustType(custType){
     this.customerType = custType;
     this.regUser.userType = this.customerType == 'partner'? 1:(this.customerType == 'rider'?2:0);
    }
  async  registerUser(){
      if(!this.regUser.tcAccepted){
        const toast = await this.toastCtrl.create({
          duration: 3000,
          message: 'Please Read and Accept Terms & Condition to enable you proceed',
          color: "danger"
        });
        toast.present();
      }else{
      this.registerService.register(this.regUser).subscribe(async (data:ObjectResourceOfRegisterUserResource)=>{
if(data.code == '007'){
  this.RegisterUserResource = data.data;
  this.AuthenService.addUser(this.RegisterUserResource);
  const toast = await this.toastCtrl.create({
    duration: 3000,
    message: data.message,
    color: "success"
  });
  toast.present();
  this.router.navigate(['providephone'])
}else{
  const toast = await this.toastCtrl.create({
    duration: 3000,
    message: data.message,
    color: "danger"
  });
  toast.present();
}
      });
        
      }
      
    }



    async fblogin() {
      this.fb.login(['email'])
        .then((response: FacebookLoginResponse) => {
          this.fbonLoginSuccess(response);
          console.log(response.authResponse.accessToken);
        }).catch((error) => {
          console.log(error);
          alert('error:' + error);
        });
    }
  
    fbonLoginSuccess(res: FacebookLoginResponse) {
      // const { token, secret } = res;
      const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      this.fireAuth.signInWithCredential(credential)
        .then((response) => {
          this.user = response.user;
          this.regUser.fullName = this.user.displayName;
          this.regUser.email = this.user.email;    
          console.log(this.user)
        });
  
    }
  
    doLogin(){  
      let params: any;
      if (this.platform.is('cordova')) {
        if (this.platform.is('android')) {
          params = {
            webClientId: '364350750552-ddfim24i0i91n45281anj059kqailqqj.apps.googleusercontent.com', //  webclientID 'string'
            offline: true
          };
        } else {
          params = {};
        }
        this.google.login(params)
        .then((response) => {
          const { idToken, accessToken } = response;
          this.onLoginSuccess(idToken, accessToken);
        }).catch((error) => {
          console.log(error);          
        });
      } else{
        this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(success => {
          console.log('success in google login', success);
          this.isGoogleLogin = true;
          this.user = success.user;
          this.regUser.fullName = this.user.displayName;
          this.regUser.email = this.user.email;          
        }).catch(err => {
          console.log(err.message, 'error in google login');
        });
      }
    }
    onLoginSuccess(accessToken, accessSecret) {
      const credential = accessSecret ? firebase.auth.GoogleAuthProvider
          .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
              .credential(accessToken);
      this.fireAuth.signInWithCredential(credential)
        .then((success) => {  
          this.isGoogleLogin = true;
          this.user = success.user;
          this.regUser.fullName = this.user.displayName;
          this.regUser.email = this.user.email;
          console.log(this.user);
          this.loading.dismiss();
        });
  
    }
  
    ngOnInit() {
      this.activatedroute.queryParams.subscribe(data=>{
        if(data.custType){
          this.getcustType(data.custType);
        }
        if(data.terms){
          this.regUser.tcAccepted = data.terms;
          console.log(this.regUser);
        }
      })
    }

}
