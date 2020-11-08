import { NeworderComponent } from './../neworder/neworder.component';
import { Component, OnInit } from '@angular/core';
import { product_descriptionModel} from './../../_models/checkout';
import { FormsModule, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import { NavController,ToastController,AlertController} from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { CheckoutassistanceServiceProxy } from 'src/app/_services/service-proxies';
import { CheckOutAssistanceProductModel,CheckOutAssistanceDTO,CheckoutAssistance, CheckOutAssistanceModel,ObjectResourceOfUserViewModel } from 'src/app/_models/service-models';


@Component({
  selector: 'app-multiple',
  templateUrl: './multiple.page.html',
  styleUrls: ['./multiple.page.scss'],
})
export class MultiplePage implements OnInit {
  checkedIdx = true;
  activetab:string = "";
  homedelivery:string = ""
  totalOrders = [];
    
  productDescriptionPanel: boolean = false;
  deliveryDetailsPanel: boolean = true;
  addNewPanel: boolean = true;
  
  product_descriptionForm :FormGroup;

  myorder: CheckOutAssistanceProductModel = new CheckOutAssistanceProductModel ();
  // delivery_details : delivery_details = {};
  // product_description : product_descriptionModel ={};

  orders = {};
  myForm :FormGroup;

  product_desc = new CheckOutAssistanceProductModel().clone();
  request_desc = new CheckOutAssistanceModel().clone();
  all_product_desc: CheckOutAssistanceProductModel[];
  
  checkOutAsst = new CheckOutAssistanceDTO().clone();

  constructor(private toastCtrl: ToastController,
    private router: Router,
    private navCtrl: NavController,
    public popoverController: PopoverController,
    private activatedroute: ActivatedRoute,
    private checkout: CheckoutassistanceServiceProxy) { }

  
      // async addOrder(ev: any) {
      //   const popover = await this.popoverController.create({
      //     component: NeworderComponent,
      //     cssClass: 'my-custom-class',
      //     event: ev,
      //     translucent: true
      //   });
      //   return await popover.present();
      // }
      async addOrder(){
        const subject = new Subject<boolean>()
        const modal = await this.popoverController.create({
          component: NeworderComponent,
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

  ngOnInit() {
  }

  authuserdetails = new ObjectResourceOfUserViewModel().clone();
  // myorder: CheckOutAssistanceProductModel = new CheckOutAssistanceProductModel ();
  
  
  home_delivery($option){
    this.homedelivery = $option;
  }

  goback(){
    this.navCtrl.back();
  }

  yesfn(event){
    if(event.detail.checked) this.checkedIdx = true;
  }

  nofn(event){
    if(event.detail.checked) this.checkedIdx = false;
   }

myfunction($val){
  this.activetab = $val;
}

validateProductDescriptionForm(){

  if(this.product_desc.name &&
     this.product_desc.url &&
      this.product_desc.delivery &&
      this.product_desc.quantity &&
       this.product_desc.color && this.product_desc.size){
    this.deliveryDetailsPanel = false;
  }
  }
  
  validateDeliveryDetailsForm(){
  if(this.request_desc.customerAddress &&
     this.request_desc.deliveryLocationId &&
     this.request_desc.shipToState){
         
      this.myorder = this.product_desc;
      //console.log(this.myorder)
  }
  }

myoption(event) {
  this.homedelivery = event.detail.value;
}

get diagnostic() { 
  return JSON.stringify(this.product_desc); 
}

newOrder(product_descriptionForm){
   this.totalOrders.push(this.product_desc);
  console.log(this.totalOrders) 
}

logvalue(event){
  console.log(event)
}

async addNewProduct(){
  const subject = new Subject<boolean>()
  const modal = await this.popoverController.create({
    component: NeworderComponent,
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
  this.saveOrder()
  this.productDescriptionPanel = false
  this.deliveryDetailsPanel  = false
  this.activetab = null
}

onSubmit(){
  let productDetails = new CheckOutAssistanceProductModel()
  //Product details
  productDetails.name = this.product_desc.name;
  productDetails.quantity = this.product_desc.quantity;
  productDetails.size = this.product_desc.size;
  productDetails.color = this.product_desc.color;
  productDetails.url = this.product_desc.url;
  productDetails.delivery = this.product_desc.delivery
  productDetails.itemNumber = this.product_desc.itemNumber
  productDetails.comment = this.product_desc.comment;
  productDetails.style = this.product_desc.style;

  //Delivery Details
  let RequestDetails = new CheckOutAssistanceModel();
  RequestDetails.checkoutProcessing = this.request_desc.checkoutProcessing;
  RequestDetails.customerAddress = this.authuserdetails.data.customer.homeAddress;
  RequestDetails.customerName = this.authuserdetails.data.customer.fullName;
  RequestDetails.customerPhone = this.authuserdetails.data.user.phoneNumber;
  RequestDetails.shipToState = this.request_desc.shipToState;
  RequestDetails.pickupCenter = this.request_desc.pickupCenter;
  RequestDetails.deliveryLocationId = this.request_desc.deliveryLocationId;

  this.checkOutAsst.products.push(productDetails);
  this.checkOutAsst.request = RequestDetails;
  console.log(this.checkOutAsst);

  //  let singleProduct = new 
//     console.log(myForm.value);
//     this.checkout.create(myForm.value).subscribe(data => {})
  
}


saveOrder() {
  this.gotoSummary();
  
}

// submitBooking(){
//   if(this.singleDelivery){
//     this.gotoSummary()
//   } else {
//     this.showAddNewBookingModal()
//   }
// }

gotoSummary(){
  this.onSubmit()
    //this.store.saveBookings(this.checkOutAsst)
    this.router.navigate(['localdelivery/review-booking'])

}

// onSubmit(myForm){
   
//   console.log(myForm.value);
//   this.checkout.create(myForm.value).subscribe(data => {})

// }

}
