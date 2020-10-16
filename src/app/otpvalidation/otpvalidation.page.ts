import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { NavController,ToastController,AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-otpvalidation',
  templateUrl: './otpvalidation.page.html',
  styleUrls: ['./otpvalidation.page.scss'],
})
export class OtpvalidationPage implements OnInit {
  verificationID:any
  currentPhoneNumber: any;
  code1 = '';
  code2 = '';
  code3 = '';
  code4 = '';
  constructor(private activatedroute: ActivatedRoute,
    public firebaseAuthentication: FirebaseAuthentication,
    private navCtrl: NavController, 
    private toastCtrl: ToastController,
    private router: Router,
    private fireAuth: AngularFireAuth,
    ) {
      this.firebaseAuthentication.onAuthStateChanged().subscribe(userInfo=>{
        if (userInfo) {
         this.router.navigate(['home'])
      } 
      })

     }
verifyOTP(){
  let receivedotp = this.code1 + this.code2 + this.code3 + this.code4;
  console.log(receivedotp);
  // const otp = this.verificationID.toString().substr(0, 6);
  //               if(receivedotp){
  //                 if(receivedotp == otp){
                  
  //                 }else{
                   
  //                 }
  //               }

  this.router.navigate(['home']);
}

  sendOTP(phoneNumber){
    this.firebaseAuthentication.verifyPhoneNumber(phoneNumber, 30000).then(async(verificationID) => {
      this.verificationID = verificationID;
      console.log(this.verificationID)
    
    })
  }
  goback(){
    this.navCtrl.back();
  }

 async codeValidation(codeElement,value){
    var reg = new RegExp('^[+.0-9]+$');
    if(value !== "" && value && reg.test(value)){

    }else{
   if(codeElement == "code1") this.code1 = "";
   if(codeElement == "code2") this.code2 = "";
   if(codeElement == "code3") this.code3 = "";
   if(codeElement == "code4") this.code4 = "";
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
    this.sendOTP(data.phoneNumber);
      this.currentPhoneNumber = data.phoneNumber;
      //console.log(data.phoneNumber)
    })
  }

}
