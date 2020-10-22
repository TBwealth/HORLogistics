import { Component, OnInit } from '@angular/core';
import { FormGroup} from "@angular/forms";
import { NavController,LoadingController, Platform} from '@ionic/angular';
import { from } from 'rxjs';
import { User, UserClass } from "../_models/user";
import {Router,ActivatedRoute} from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

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
user: User;
type: string;

login: any = {
  email: '',
  password: ''
};
emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
loading: any;
isGoogleLogin = false;

  constructor(private router: Router,
    private navCtrl: NavController,
    private activatedroute: ActivatedRoute,
    private google: GooglePlus,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth,
    private platform: Platform,) { }

  async  loginUser(){}
  async forgotPassword(){}
  gototerms(){
this.router.navigate(['terms'])
  }
  goback(){
    this.navCtrl.back();
  }
  register(){
    this.router.navigate(['customerspartneroption'])
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
        alert('error:' + JSON.stringify(error));
      });
    } else{
      console.log('else...');
      this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(success => {
        console.log('success in google login', success);
        this.isGoogleLogin = true;
        this.user =  success.user;
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
        alert('successfully');
        this.isGoogleLogin = true;
        this.user =  success.user;
        console.log(this.user);
        this.loading.dismiss();
      });

  }




  ngOnInit() {

  }

}
