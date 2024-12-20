import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { NavController,ToastController,AlertController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AccountServiceProxy } from '../_services/service-proxies';
import { AuthenticationService } from '../_services/authentication.service';
import {  VerifiedPhoneUpdate,StatusResource, LoginResource, } from "../_models/service-models";
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-otpvalidation',
  templateUrl: './otpvalidation.page.html',
  styleUrls: ['./otpvalidation.page.scss'],
})
export class OtpvalidationPage implements OnInit {
  userCurrent = new LoginResource().clone();
  verificationID:any
  currentPhoneNumber: any;
  VerifiedPhoneUpdate = new VerifiedPhoneUpdate().clone();
  code1 = '';
  code2 = '';
  code3 = '';
  code4 = '';
  code5 = '';
  code6 = '';

  constructor(private activatedroute: ActivatedRoute,
    public firebaseAuthentication: FirebaseAuthentication,
    private navCtrl: NavController, 
    private toastCtrl: ToastController,
    private router: Router,
    private fireAuth: AngularFireAuth,
    private AuthenService: AuthenticationService,
    private registerService: AccountServiceProxy,
    private loading: LoadingController,
    ) {
      this.firebaseAuthentication.onAuthStateChanged().subscribe(async userInfo=>{
        if (userInfo) {
          const loading = await this.loading.create({message: "please wait...",
          translucent: true,
          spinner: "bubbles",cssClass: 'my-loading-class'});
          loading.present();
          this.AuthenService.getuser().then(async(usersdata:LoginResource[])=>{
          if(usersdata.length > 0){
            this.VerifiedPhoneUpdate.userId = usersdata[0].userId;
            this.VerifiedPhoneUpdate.phone = this.currentPhoneNumber;
            this.VerifiedPhoneUpdate.isVerified = true;
            this.registerService.verifyPhone(this.VerifiedPhoneUpdate).subscribe(async(data:StatusResource)=>{
          if(data.code == "000"){            
          const toast = await this.toastCtrl.create({
            duration: 3000,
            message: 'Phone Number Verified Successfully',
            color: "success"
          });
          toast.present();
            this.router.navigate(['profilepage'])
            loading.dismiss();
          }else{
            const toast = await this.toastCtrl.create({
              duration: 3000,
              message: data.message,
              color: "danger"
            });
            toast.present();
            loading.dismiss();
          }
            });
          }else{
            loading.dismiss();
            const toast = await this.toastCtrl.create({
              duration: 3000,
              message: 'Oops! something went wrong',
              color: "danger"
            });
            toast.present();
          }
          }, async error =>{
            console.log(error)
            loading.dismiss();
            const toast = await this.toastCtrl.create({
              duration: 3000,
              message: 'Oops! something went wrong',
              color: "danger"
            });
            toast.present();
          })
                }
                })

     }
async verifyOTP(){
  const loading = await this.loading.create({message: "please wait...",
  translucent: true,
  spinner: "bubbles",cssClass: 'my-loading-class'});
  loading.present();
  let receivedotp = this.code1 + this.code2 + this.code3 + this.code4 + this.code5 + this.code6;
                if(receivedotp){
                  this.firebaseAuthentication.signInWithVerificationId(this.verificationID,receivedotp).then(async resdata=>{
                   
                    console.log('otp val resp',resdata)
                    if(resdata == "OK"){
                      this.AuthenService.getuser().then((usersdata:LoginResource[])=>{
                        if(usersdata.length > 0){
                          this.VerifiedPhoneUpdate.userId = usersdata[0].userId;
                          this.VerifiedPhoneUpdate.phone = this.currentPhoneNumber;
                          this.VerifiedPhoneUpdate.isVerified = true;
                          this.registerService.verifyPhone(this.VerifiedPhoneUpdate).subscribe(async(data:StatusResource)=>{
                            if(data.code == "000"){
                              this.AuthenService.addUser(usersdata[0]);
                              
                              const toast = await this.toastCtrl.create({
                                duration: 3000,
                                message: 'Phone Number Verified Successfully',
                                color: "success"
                              });
                              toast.present();
                              this.router.navigate(['profilepage'])
                              loading.dismiss();
                            }else{
                              const toast = await this.toastCtrl.create({
                                duration: 3000,
                                message: 'Unable to validate number',
                                color: "danger"
                              });
                              toast.present();
                              loading.dismiss();
                            }
                              }, async error =>{
                                console.log(error)
                                loading.dismiss();
                                const toast = await this.toastCtrl.create({
                                  duration: 3000,
                                  message: 'Oops! something went wrong',
                                  color: "danger"
                                });
                                toast.present();
                              });
                         
      
                        }
                      })
                    }else{
                      loading.dismiss();
                      const toast = await this.toastCtrl.create({
                        duration: 3000,
                        message: 'Invalid/Wrong OTP',
                        color: "danger"
                      });
                      toast.present();
                    }
                  }, async error =>{
                    console.log(error)
                    loading.dismiss();
                    const toast = await this.toastCtrl.create({
                      duration: 3000,
                      message: error,
                      color: "danger"
                    });
                    toast.present();
                  });
                
                }
           
}

  sendOTP(phoneNumber){
    this.firebaseAuthentication.verifyPhoneNumber(phoneNumber, 30000).then(async(verificationID) => {
      this.verificationID = verificationID;
      console.log('otp',this.verificationID)    
    })
  }
  goback(){
    this.navCtrl.back();
  }

 async codeValidation(nextElement,codeElement,value){
    var reg = new RegExp('^[+.0-9]+$');
    if(value !== "" && value && reg.test(value)){
      //if(codeElement != "code6")
      nextElement.setFocus();
    }else{
   if(codeElement == "code1") this.code1 = "";
   if(codeElement == "code2") this.code2 = "";
   if(codeElement == "code3") this.code3 = "";
   if(codeElement == "code4") this.code4 = "";
   if(codeElement == "code5") this.code5 = "";
   if(codeElement == "code6") this.code6 = "";
   const toast = await this.toastCtrl.create({
    duration: 3000,
    message: 'Input Number Only',
    color: "danger"
  });
  toast.present();
    }
  }

  ngOnInit() {
    this.activatedroute.queryParams.subscribe(data=>{
      if(data.phoneNumber){
        this.currentPhoneNumber = data.phoneNumber;
        console.log(data.phoneNumber)
      this.sendOTP(data.phoneNumber);
        
      }else{
        this.router.navigate(['providephone']);
      }
    
    })
  }

}
