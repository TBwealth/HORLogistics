import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import { NavController, ToastController,AlertController} from '@ionic/angular';
import { local_deliveryModel, pickup_detailsModel, package_detailsModel, LocaldeliveryButton } from '../../../_models/local_delivery'
import libphonenumber from 'google-libphonenumber';
import {ICountry} from '../../../_models/country.type';
import { CountryserviceService } from '../../../_services/countryservice.service';

@Component({
  selector: 'app-singleorder',
  templateUrl: './singleorder.page.html',
  styleUrls: ['./singleorder.page.scss'],
})
export class SingleorderPage implements OnInit {

  constructor(public Cservice: CountryserviceService,
    private toastCtrl: ToastController,
    private router: Router,
    private navCtrl: NavController,
    private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.getcountry();
    this.getCountryFlag("NG",'')
  }

  pickupDetailsPanel: boolean = false;
  DeliveryDetailsPanel: boolean = true;
  packageDeliveryPanel: boolean = true;

  package_detailsForm:FormGroup;
  pickup_detailsForm: FormGroup; 
  delivery_detailsForm:FormGroup;
  
  local_delivery : local_deliveryModel ={};
  pickup_details : pickup_detailsModel = {};
  package_details : package_detailsModel ={};

  localoptions : LocaldeliveryButton = {};

  checkedIdx= true;
  disVal = true;
  // options = [
  //   'Yes',
  //   'No'
  // ];

  public myform = [
    { val: 'Yes', isChecked: true },
    { val: 'No', isChecked: false }
  ];

  //changeValue

  pickup:boolean = false;
  delivery:boolean = false;
  package:boolean = false;
  activetab:string = "";

  ICountrys: ICountry[];
  ICountry: ICountry;
  selectedFlag: any="";
  selectedCallingCode:  any="";
  alpha2Code = "NG";
  phoneError: boolean = true;

  deliveryAlpha2Code = "NG";
  deliveryphoneError: boolean = true;
  deliveryselectedFlag: any="";
  deliveryselectedCallingCode:  any="";

  yesfn(event){
    if(event.detail.checked) this.checkedIdx = true;
  }

  nofn(event){
    if(event.detail.checked) this.checkedIdx = false;
   }

  goback(){
    this.navCtrl.back();
  }

  myfunction($val){
    this.activetab = $val;
  }

  validatePickupForm(){
 
    if(this.pickup_details.booking_category &&
       !this.phoneError && 
       this.pickup_details.pickup_address &&
        this.pickup_details.pickup_busstop &&
         this.pickup_details.pickup_landmark && this.pickup_details.pickup_name){
      this.DeliveryDetailsPanel = false;
    }else{
  
      this.DeliveryDetailsPanel = true;
  this.packageDeliveryPanel = true;
    }
  }
  
  validateDeliveryForm(){
    console.log(this.local_delivery);
    if(this.local_delivery.delivery_address &&
      !this.deliveryphoneError && 
      this.local_delivery.delivery_busstop &&
       this.local_delivery.delivery_date &&
        this.local_delivery.delivery_landmark &&
         this.local_delivery.delivery_name){
           
     this.packageDeliveryPanel = false;
   }else{
  this.packageDeliveryPanel = true;
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
  
       getCountryFlag(countVal,panel){
         this.selectedFlag = this.Cservice.getCountryFlag(countVal);
         if(panel == 'pickup' || panel == '')this.alpha2Code = countVal;
         if(panel == 'delivery')this.deliveryAlpha2Code = countVal;
         
       }
       getcountry() {
     this.ICountrys = this.Cservice.setItems(); 
     // console.log(this.ICountrys);
     this.alpha2Code = "NG";
     this.deliveryAlpha2Code   = "NG";
        }
    async  phoneValidation(pNumber, panel){
      var reg = new RegExp('^[+.0-9]+$');
      let pnumber="";
      if(panel == 'pickup'){var phonecode = this.alpha2Code};
      if(panel == 'delivery'){var phonecode = this.deliveryAlpha2Code};
      
  
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
    if(panel == 'pickup'){
      this.phoneError = false; 
      this.pickup_details.pickup_phone = pnumber; 
    };
    if(panel == 'delivery'){
      this.deliveryphoneError = false; 
      this.local_delivery.delivery_phone = pnumber; 
    };
   
  }else{
    if(panel == 'pickup'){
      this.phoneError = true; 
    };
    if(panel == 'delivery'){
      this.deliveryphoneError = true; 
    };
  }
      }
      else{
        if(panel == 'pickup'){
          this.phoneError = true; 
        };
        if(panel == 'delivery'){
          this.deliveryphoneError = true; 
        };
       const toast = await this.toastCtrl.create({
        duration: 3000,
        message: 'valid Phone Number is required',
        color: "danger"
      });
      toast.present();
      }
  
    
    }

}
