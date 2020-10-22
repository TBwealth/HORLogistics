import { Component, OnInit } from '@angular/core';
import { FormGroup} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { NavController,ToastController,AlertController } from '@ionic/angular';
import { CountryserviceService } from '../_services/countryservice.service';
import libphonenumber from 'google-libphonenumber';
import {ICountry} from '../_models/country.type';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';

@Component({
  selector: 'app-providephone',
  templateUrl: './providephone.page.html',
  styleUrls: ['./providephone.page.scss'],
})
export class ProvidephonePage implements OnInit {
  ICountrys: ICountry[];
  ICountry: ICountry;
  regForm: FormGroup;
  selectedFlag: any="";
  selectedCallingCode:  any="";
  alpha2Code = "NG";
  verificationID: any;
  regUser: any = {
    businessname: '',
    businessanniversary: new Date().toISOString(),
    lastname: '',
    firstname:'',
    phone:'',
    phoneStatus: false,
    callingcode: '',
    alpha2Code: '',
    otpCode: '',
    email: '',
    password: '',
    terms: false,
  };
  phoneError: boolean = false;
  constructor(
    private toastCtrl: ToastController,
    public Cservice: CountryserviceService,
    private router: Router,
    private navCtrl: NavController,
    private activatedroute: ActivatedRoute,
    private alertCtrl: AlertController,
    public firebaseAuthentication: FirebaseAuthentication,
  ) { }


  goback(){
    this.navCtrl.back();
  }

async  phoneValidation(pNumber){
    var reg = new RegExp('^[+.0-9]+$');
    let pnumber="";
    let phonecode = this.alpha2Code;

    let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance(),
    PNF = libphonenumber.PhoneNumberFormat;
    if(pNumber !== "" && pNumber && reg.test(pNumber)){
     
        const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
        let phoneNumber = "" + pNumber + "",
        
            region = phonecode,
            number = phoneUtil.parse(phoneNumber, region),
            isValidNumber = phoneUtil.isValidNumber(number);
           pnumber = phoneUtil.format(number, PNF.E164);
if(isValidNumber){
  this.phoneError = false;  
  this.regUser.phone=pnumber;
}else{
  this.phoneError = true;
}
    }
    else{
     this.phoneError = true;
     const toast = await this.toastCtrl.create({
      duration: 3000,
      message: 'valid Phone Number is required',
      color: "danger"
    });
    toast.present();
    }

  
  }

 async sendOTP(){
    if(!this.phoneError){
this.router.navigate(['otpvalidation'],{queryParams:{phoneNumber:this.regUser.phone}})
     
    }else{

      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: 'valid Phone Number is required',
        color: "danger"
      });
      toast.present();
    }
  }
  openCountries(){
 setTimeout(() => {
 // this.ICountrys = this.Cservice.setItems(); 
  let radios=document.getElementsByClassName('alert-radio-label');
  for (let index = 0; index < radios.length; index++) {
      let element = radios[index];
     var elValue = element.innerHTML.valueOf();
     element.innerHTML = '<img class="country-image" style="width: 30px;height:16px;" src="'+this.ICountrys[index].flag+'" />';
      element.innerHTML=element.innerHTML.concat(' '+ elValue);
    }
 }, 1000);
  }
  getCountryFlag(countVal){
    this.selectedFlag = this.Cservice.getCountryFlag(countVal);
    this.alpha2Code = countVal;
    
  }
  getcountry() {
this.ICountrys = this.Cservice.setItems(); 
// console.log(this.ICountrys);
this.alpha2Code = "NG";
   }
  ngOnInit() {
    this.getcountry();
    this.getCountryFlag("NG")
  }

  ngAfterViewInit(){   
    this.alpha2Code = "NG";
  }

}
