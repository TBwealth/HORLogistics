import { Component, OnInit } from '@angular/core';
import { FormGroup} from "@angular/forms";
import { NavController,LoadingController, Platform, ToastController, AlertController} from '@ionic/angular';
import { from } from 'rxjs';
import { User, socialUser } from "../_models/user";
import { LoginViewModel,ObjectResourceOfLoginResource, LoginResource, 
  SocialSignUpViewModel,ObjectResourceOfRegisterUserResource,RegisterUserResource } from "../_models/service-models";
import {Router,ActivatedRoute} from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AccountServiceProxy, ManageServiceProxy, RegisterServiceProxy } from '../_services/service-proxies';
import { AuthenticationService } from '../_services/authentication.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
signinSegment: boolean = true;
signupSegment: boolean = false;
loginForm: FormGroup;
responseData: any;
user: socialUser;
type: string;
LoginResource = new LoginResource().clone();
login = new LoginViewModel().clone(); 
socLogin = new SocialSignUpViewModel().clone();
emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
loading: any;
isGoogleLogin = false;
RegisterUserResource = new RegisterUserResource().clone();
customerType: any;
  constructor(private router: Router,
    private navCtrl: NavController,
    private activatedroute: ActivatedRoute,
    private google: GooglePlus,
    public loadingController: LoadingController,
    private toastCtrl: ToastController,
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    private fb: Facebook,
    private registerService: AccountServiceProxy,
    private soclLogin: RegisterServiceProxy,
    private AuthenService: AuthenticationService,
    private loadspinner: LoadingController,
    private alertController: AlertController,
    private manageUsers: ManageServiceProxy,
    public storage: Storage) { }

async loginUser(){
  this.loading = await this.loadspinner.create({
    message: "please wait...",
    translucent: true,
    spinner: "bubbles",
  });
  await this.loading.present();
 this.storage.get('token').then(data=>{
  if(data)this.login.deviceId = data;
  this.registerService.login(this.login).subscribe(async (data:ObjectResourceOfLoginResource)=>{
    if(data.code == '007'){
      this.LoginResource = data.data;
      this.AuthenService.addUser(this.LoginResource);
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: data.message,
        color: "success"
      });
      toast.present();  
      setTimeout(() => {
        this.loading.dismiss();
      this.router.navigate(['home'])
      }, 3000);
    }else{
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: data.message,
        color: "danger"
      });
      toast.present();
      this.loading.dismiss();
    }
   
          },async error =>{
            const toast = await this.toastCtrl.create({
              duration: 3000,
              message: 'Oops! something went wrong',
              color: "danger"
            });
            toast.present();
            this.loading.dismiss();
          });
 });
 

  }
  async forgotPassword(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Forgot Password',
      message: 'Please input your Email to receive password reset link',
      inputs: [
        {
          name: 'femail',
          type: 'text',
          placeholder: 'E-mail Address',
          
        }],
      buttons:  [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Send Link',
          handler: async (femail) => {
           // console.log(femail.femail);
            this.loading = await this.loadspinner.create({
              message: "please wait...",
              translucent: true,
              spinner: "bubbles",
            });
            await this.loading.present();

            this.manageUsers.forgotpassword(femail.femail).subscribe(async res=>{
              if(res.code == "000"){
                const toast = await this.toastCtrl.create({
                  duration: 3000,
                  message: res.message,
                  color: "success"
                });
                toast.present();
                this.loading.dismiss()
              }else{
                const toast = await this.toastCtrl.create({
                  duration: 3000,
                  message: res.message,
                  color: "danger"
                });
                toast.present();
                this.loading.dismiss()
              }
            },async error=>{
              const toast = await this.toastCtrl.create({
                duration: 3000,
                message: 'Oops! something went wrong',
                color: "danger"
              });
              toast.present();
              this.loading.dismiss()
            })
          }
        }
      ]
    });
  
    await alert.present();

  }
  gototerms(){
this.router.navigate(['terms'])
  }
  goback(){
    this.navCtrl.back();
  }
  register(){
    this.router.navigate(['preferedaction'])
  }

 async socialLogin(userDetails: socialUser){
    this.loading = await this.loadspinner.create({
      message: "please wait...",
      translucent: true,
      spinner: "bubbles",
    });
    await this.loading.present();
    this.socLogin.email = userDetails.email;
    this.socLogin.fullName = userDetails.displayName;
    this.soclLogin.socialSignup(this.socLogin).subscribe(async (data:ObjectResourceOfRegisterUserResource)=>{
      if(data.code == '007'){
        this.RegisterUserResource = data.data;
        this.AuthenService.addUser(this.RegisterUserResource);
        const toast = await this.toastCtrl.create({
          duration: 3000,
          message: "Success",
          color: "success"
        });
        toast.present();
        setTimeout(() => {
          this.loading.dismiss();
        this.router.navigate(['home'])
        }, 3000);
      }else{
        const toast = await this.toastCtrl.create({
          duration: 3000,
          message: data.message,
          color: "danger"
        });
        toast.present();
        this.loading.dismiss();
      }
            },async error =>{
              const toast = await this.toastCtrl.create({
                duration: 3000,
                message: 'Oops! something went wrong',
                color: "danger"
              });
              toast.present();
              this.loading.dismiss();
            });
  }

  async fblogin() {
    this.fb.login(['email'])
      .then((response: FacebookLoginResponse) => {
        this.fbonLoginSuccess(response);
        console.log(response.authResponse.accessToken);
      }).catch((error) => {
        console.log(error);     
      });
  }

  fbonLoginSuccess(res: FacebookLoginResponse) {
    // const { token, secret } = res;
    const credential = firebase.default.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    this.fireAuth.signInWithCredential(credential)
      .then((response) => {
        console.log(response.user);
        this.user = response.user;
      this.socialLogin(this.user);
      },async error=>{
        console.log('credential error', error)
        const toast = await this.toastCtrl.create({
          duration: 3000,
          message: 'error in facebook login',
          color: "danger"
        });
        toast.present();
      });

  }
  getcustType(custType){
    this.customerType = custType;
   
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
      console.log('else...');
      this.fireAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider()).then(success => {
        console.log('success in google login', success);
        this.isGoogleLogin = true;
        this.user = success.user;
        this.socialLogin(this.user);
        console.log(success.user);
      }).catch(err => {
        console.log(err.message, 'error in google login');
      });
    }
  }
  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.default.auth.GoogleAuthProvider
        .credential(accessToken, accessSecret) : firebase.default.auth.GoogleAuthProvider
            .credential(accessToken);
    this.fireAuth.signInWithCredential(credential)
      .then((success) => {
        this.isGoogleLogin = true;
        this.user = success.user;
        this.socialLogin(this.user);
        console.log(this.user);
   
      });

  }




  ngOnInit() {
    this.activatedroute.queryParams.subscribe(data=>{
      if(data.custType){
        this.getcustType(data.custType);
      }
    
    })
  }

}
