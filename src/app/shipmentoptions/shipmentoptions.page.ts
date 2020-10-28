import { FormGroup } from '@angular/forms';
import { from } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { NavController,ToastController,AlertController} from '@ionic/angular';
import { description_details, pickup_details, delivery_details, hold_instruction, booking_category } from "../_models/shipment.model";
import libphonenumber from 'google-libphonenumber';
import {ICountry} from '../_models/country.type';
import { CountryserviceService } from '../_services/countryservice.service';


@Component({
  selector: 'app-shipmentoptions',
  templateUrl: './shipmentoptions.page.html',
  styleUrls: ['./shipmentoptions.page.scss'],
})
export class ShipmentoptionsPage implements OnInit {
  checkedIdx = true;
  activetab:string = "";
  
  description_div: boolean = true;
  pickup_div: boolean = false;
  delievry_div: boolean = false;
  hold_div: boolean = false;
  
  bookingCategoryPanel: boolean = false;
  packageDescriptionPanel: boolean = true;
  pickupDetailsPanel: boolean = true;
  deliveryDetailsPanel: boolean = true;
  holdInstructionPanel: boolean = true;

  shipment_booking: booking_category = {};
  shipment_description: description_details = {};
  shipment_pickup: pickup_details = {};
  shipment_delivery: delivery_details ={};
  shipment_hold: hold_instruction = {};

  bookingForm: FormGroup;
  descriptionForm:FormGroup;
  pickupForm:FormGroup;
  deliveryForm:FormGroup;
  holdForm:FormGroup;

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
  constructor(
    public Cservice: CountryserviceService,
    private toastCtrl: ToastController,
    private router: Router,
    private navCtrl: NavController,
    private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.getcountry();
    this.getCountryFlag("NG",'')
  }

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

  validateBookingForm(){
    if(this.shipment_booking &&
      this.shipment_booking.booking_category){
        this.packageDescriptionPanel = false;
      } 
     else {
      this.packageDescriptionPanel = true;
      }
  }

  validateDescriptionForm(){
 
    if(
       this.shipment_description.description &&
        this.shipment_description.estimated_weight &&
         this.shipment_description.package_value){
        this.pickupDetailsPanel = false;
    }
     else{
  
          this.pickupDetailsPanel = true;
  }
  }

  validatePickupForm(){
    // console.log(this.pickupForm);
    if(this.shipment_pickup.pickup_name &&
      this.shipment_pickup.pickup_address &&
       this.shipment_pickup.pickup_phone){          
       this.deliveryDetailsPanel = false;
       //this.holdInstructionPanel = false;
   }
    else{
    this.deliveryDetailsPanel = true;
   } 
  }

  validateDeliveryForm(){
    // console.log(this.deliveryForm);
    if(this.shipment_delivery.delivery_address &&
      this.shipment_delivery.delivery_name &&
      //  this.shipment_delivery.delivery_home &&
        this.shipment_delivery.delivery_location){     
        this.holdInstructionPanel = false;
      }
      else{
      this.holdInstructionPanel = true;
      }

       }
       validateHoldForm(){

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
      this.shipment_pickup.pickup_phone = pnumber; 
    };
    if(panel == 'delivery'){
      this.deliveryphoneError = false; 
      this.shipment_delivery.delivery_phone = pnumber; 
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
