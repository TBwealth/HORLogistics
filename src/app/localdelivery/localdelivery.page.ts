import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import { NavController,ToastController,AlertController, PopoverController} from '@ionic/angular';
import { local_deliveryModel, pickup_detailsModel, package_detailsModel, LocaldeliveryButton } from '../_models/local_delivery'
import libphonenumber from 'google-libphonenumber';
import {ICountry} from '../_models/country.type';
import { CountryserviceService } from '../_services/countryservice.service';
import { AddNewOrderModalComponent } from './add-new-order-modal/add-new-order-modal.component';
import { Subject } from 'rxjs';
import { ILocalBooking, ListResourceOfLocalBookingCategoryResource, LocalBooking , LocalBookingCategory, LocalBookingCategoryResource, LocalBookingResource, PaymentTypeResoiurce} from '../_models/service-models';
import { StoreService } from '../_services/store.service';
import { LocalBookingServiceProxy, LocationsServiceProxy } from '../_services/service-proxies';
import * as moment from 'moment';

@Component({
  selector: 'app-localdelivery',
  templateUrl: './localdelivery.page.html',
  styleUrls: ['./localdelivery.page.scss'],
})
export class LocaldeliveryPage implements OnInit {
  bookings: ILocalBooking[] = []
  locations = []
  paymentTypes: PaymentTypeResoiurce[] = []
  package_detailsForm:FormGroup;
  pickup_detailsForm: FormGroup; 
  delivery_detailsForm:FormGroup;
  
  local_delivery : local_deliveryModel ={};
  pickup_details : pickup_detailsModel = {};
  package_details : package_detailsModel ={
    package_size: 1,
    package_weight: 1

  };
  bookingCategories: LocalBookingCategoryResource[]

  localoptions : LocaldeliveryButton = {};

  pickupDetailsPanel: boolean = false;
  DeliveryDetailsPanel: boolean = true;
  packageDeliveryPanel: boolean = true;
  singleDelivery = false;

  checkedIdx= true;
  disVal = true;

  showSize: false;
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

  constructor(
    public Cservice: CountryserviceService,
    private toastCtrl: ToastController,
    private router: Router,
    public navCtrl: NavController,
    public popoverController: PopoverController,
    private store: StoreService,
    private bookingService: LocalBookingServiceProxy,
    private locationService: LocationsServiceProxy,
    private activatedroute: ActivatedRoute) { }
   
    yesfn(event){
      if(event.detail.checked) this.checkedIdx = true;
    }
  
    nofn(event){
      if(event.detail.checked) this.checkedIdx = false;
     }
  
  ngOnInit() {
    this.bookingService.paymenttypes().subscribe(data => {
      this.paymentTypes = data.data
    })
    this.bookingService.localbookingcategory().subscribe(data => {
      this.bookingCategories = data.data
      console.log(this.bookingCategories)
    })
    this.getcountry();
    this.getCountryFlag("NG",'')
    this.activatedroute.url.subscribe(url => {
      if(url[0].path.includes('single')){
        this.singleDelivery = true
      }
    })
    // this.showAddNewBookingModal()
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

  async showAddNewBookingModal(){
    const subject = new Subject<boolean>()
    const modal = await this.popoverController.create({
      component: AddNewOrderModalComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        subject
      }
    });
    subject.subscribe(val => {
      modal.dismiss()
      if(val){
        this.clearForm()
      } else {
        this.gotoSummary()
      }
    })
    return await modal.present();
  }
  clearForm(){
    this.saveBooking()
    this.packageDeliveryPanel = false
    this.DeliveryDetailsPanel  = false
    this.activetab = null
  }
  submitBooking(){
    if(this.singleDelivery){
      this.gotoSummary()
    } else {
      this.showAddNewBookingModal()
    }
  }

  saveBooking(){
    let booking = new  LocalBooking();
    // Pickup
    booking.localBookingCategoryId = this.pickup_details.booking_category
    booking.senderName = this.pickup_details.pickup_name
    booking.pickUpAddress = this.pickup_details.pickup_address
    booking.phoneNumber = this.pickup_details.pickup_phone
    booking.pickupLandmark = this.pickup_details.pickup_landmark
    booking.pickupLocationId = this.pickup_details.pickup_busstop
    this.pickup_details = {}
    // booking.bus

    //Delivery
    booking.deliveryDate = new Date(this.local_delivery.delivery_date);
    booking.deliveryLandmark = this.local_delivery.delivery_landmark
    booking.recipientName = this.local_delivery.delivery_name
    booking.deliveryAddress = this.local_delivery.delivery_address
    booking.recipientPhoneNumber = this.local_delivery.delivery_phone
    booking.pickupLandmark = this.local_delivery.delivery_landmark
    booking.deliveryLocationId = this.local_delivery.delivery_busstop
    booking.deliveryTypeId = this.local_delivery.categioryId
    this.local_delivery = {}

    booking.isInsured = this.package_details.package_insurance
    booking.packageValue = this.package_details.package_value
    booking.numberOfPackages = this.package_details.package_size
    booking.estimatedPackageWeight = this.package_details.package_weight
    booking.packageDescription = this.package_details.package_description
    booking.wantCashCollection = this.package_details.cash_collection
    booking.cashCollectionAmount = this.package_details.cash_collection_amount
    booking.cashCollectionAccountNumber = this.package_details.account_number
    booking.paymentTypeId = this.package_details.payment_type
    this.package_details = {}

    this.bookings.push(booking)
    // this.storage.setItem('booking', JSON.stringify(booking))
  }

  gotoSummary(){
    this.saveBooking()
    this.store.saveBookings(this.bookings)
    this.router.navigate(['localdelivery/review-booking'])
  }

  getLocations(){
    this.locationService.category(this.pickup_details.booking_category).subscribe(data => {
      console.log(data)
      this.locations = data
    })
  }

}
