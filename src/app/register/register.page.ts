import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NavController, ToastController} from '@ionic/angular';
import { from } from 'rxjs';
import { User, UserClass,userRegistration } from "../_models/user";
import {Router,ActivatedRoute} from '@angular/router';
import { AuthService } from '../_services/auth.service';

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
  user: User;
  type: string;
  customerType: any;
  regUser: userRegistration = {
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    userType: 0,
    businessName: '',
    businessAnniversary: new Date().toISOString(),
    tcAccepted: false,
    userPicsUrl: ''
  };
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
    constructor(private router: Router,
      private navCtrl: NavController,
      private activatedroute: ActivatedRoute,
      private toastCtrl: ToastController,
      private AuthService: AuthService,
      
      private google: GooglePlus,
      private fireAuth: AngularFireAuth,
      private fb: Facebook,) { }


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
      this.AuthService.register(this.regUser).subscribe(async data=>{
if(data.code == '000'){
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
    ngOnInit() {
      this.activatedroute.queryParams.subscribe(data=>{
        if(data.custType){
          this.getcustType(data.custType);
        }
        if(data.terms){
          this.regUser.tcAccepted = data.terms;
        }
      })
    }

}
