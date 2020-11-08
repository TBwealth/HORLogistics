import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController,ToastController,AlertController, LoadingController } from '@ionic/angular';
import {  VerifiedPhoneUpdate,StatusResource, LoginResource, } from "../../_models/service-models";

@Component({
  selector: 'app-promocode',
  templateUrl: './promocode.page.html',
  styleUrls: ['./promocode.page.scss'],
})
export class PromocodePage implements OnInit {
  userCurrent = new LoginResource().clone();
  verificationID:any
  currentPhoneNumber: any;
  VerifiedPhoneUpdate = new VerifiedPhoneUpdate().clone();
  code1 = '';
  code2 = '';
  code3 = '';
  code4 = '';
  constructor(
    private navCtrl: NavController, 
    private toastCtrl: ToastController,
    private router: Router,
    private loading: LoadingController,
  ) { }
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
  goback(){
    this.navCtrl.back();
  }
  ngOnInit() {
  }

}
