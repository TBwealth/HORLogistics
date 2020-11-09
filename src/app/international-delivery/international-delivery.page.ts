import { FormGroup } from '@angular/forms';
import { from } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { NavController,ToastController,AlertController} from '@ionic/angular';
import { description_details, pickup_details, delivery_details, hold_instruction, booking_category } from "../_models/shipment.model";
import libphonenumber from 'google-libphonenumber';
import {ICountry} from '../_models/country.type';
import { CountryserviceService } from '../_services/countryservice.service';
import { InternationalbookingServiceProxy } from '../_services/service-proxies';
import { HoldInstruction, InternationalBooking, ShipmentDeliveryTypeResource, ShipmentModeResource } from '../_models/service-models';
import { InternationalRoute, StoreService } from '../_services/store.service';
import { ThrowStmt } from '@angular/compiler';


enum BOOKING_KINDS {
  DROP_OFF = 'Website',
  PICKUP = 'pickup'
}

@Component({
  selector: 'app-international-delivery',
  templateUrl: './international-delivery.page.html',
  styleUrls: ['./international-delivery.page.scss'],
})
export class InternationalDeliveryPage implements OnInit {
  countries: InternationalRoute[] = [];
  country: InternationalRoute = {};
  homePickup = false
  BOOKING_KINDS = BOOKING_KINDS;
  booking: InternationalBooking = new InternationalBooking()
  activetab:string = "";
  hold_instruction: HoldInstruction = new HoldInstruction()

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
  exportPage = false

  deliveryAlpha2Code = "NG";
  deliveryphoneError: boolean = true;
  deliveryselectedFlag: any="";
  deliveryselectedCallingCode:  any="";
  shipmentModes: ShipmentModeResource[] = [];
  shipmentDeliveryTypes: ShipmentDeliveryTypeResource[] = []
  constructor(
    public Cservice: CountryserviceService,
    private toastCtrl: ToastController,
    private router: Router,
    private navCtrl: NavController,
    private activatedroute: ActivatedRoute,
    private internationalBookingService: InternationalbookingServiceProxy,
    private store: StoreService) { }
    

    phoneNo = ''
  ngOnInit() {
    this.store.getInternationalRoutes().subscribe(data => {
      this.countries = data
    })
    this.internationalBookingService.intlbookingdeliverytypes().subscribe(data => {
      this.shipmentDeliveryTypes = data.data
    })
    this.internationalBookingService.intlbookingshipmentmode().subscribe(data => {
      this.shipmentModes = data.data
    })
    this.booking.holdInstruction = new HoldInstruction()
    // this.activatedroute.url.subscribe(url => {
    //   // if(url[0].path.includes('export')){
    //   //   this.exportPage = true
    //   //   this.booking.shipmentModeId = 2
    //   // } else {
    //   //   this.booking.shipmentModeId = 1
    //   // }
    // })
  }
  shipmentModeChanged(shipmentMode: number){
    // alert(this.booking.shipmentModeId)
    this.exportPage = this.booking.shipmentModeId == 2
  }

  goback(){
    this.navCtrl.back();
  }
  myfunction($val){
    this.activetab = $val;
  }

  validateBookingForm(){
  }

  validateDescriptionForm(){ 
  }

  validatePickupForm(){
  }
  validateDeliveryForm(){
  }
  validateHoldForm(){}
    submit(){
      if(this.exportPage){
        this.booking.shipmentModeId = 2
      } else {
        this.booking.shipmentModeId = 1
      }
      this.booking.shipmentDeliveryTypeId = 1
      this.store.saveInternationalBooking(this.booking)
      this.router.navigate(['international-delivery/summary'])
    }

    countrySelected(){
      this.country = this.countries.find(country => {
        return country.country == this.booking.country
      })
    }
}
