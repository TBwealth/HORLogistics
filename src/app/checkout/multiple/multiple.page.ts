import { AuthService } from './../../_services/auth.service';
import { NeworderComponent } from './../neworder/neworder.component';
import { Component, OnInit } from '@angular/core';
import {FormGroup } from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { CheckoutassistanceServiceProxy, ManageServiceProxy } from 'src/app/_services/service-proxies';
import { CheckOutAssistanceProductModel, CheckOutAssistanceDTO, CheckOutAssistanceModel,ObjectResourceOfUserViewModel } from 'src/app/_models/service-models';
import { AuthenticationService } from 'src/app/_services/authentication.service';


@Component({
  selector: 'app-multiple',
  templateUrl: './multiple.page.html',
  styleUrls: ['./multiple.page.scss'],
})
export class MultiplePage implements OnInit {
  isMultiple = false;
  checkedIdx = true;
  activetab:string = "";
  homedelivery:string = ""
  totalOrders = [];
  loading: any;
    
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
    private checkout: CheckoutassistanceServiceProxy,
    private activeUser: ManageServiceProxy,
    public AuthService: AuthenticationService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.checkOutAsst.products = [];
    this.activatedroute.queryParamMap.subscribe(data => {
      this.isMultiple = data.get('multiple') == 'false';
    })
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
    if(event.detail.checked){
      this.checkedIdx = true;      
        this.request_desc.checkoutProcessing = 'home';
        this.request_desc.pickupCenter = null;    
    }
  }

  nofn(event){
    if(event.detail.checked) {
      this.checkedIdx = false;
      this.request_desc.checkoutProcessing = 'pickup';
      this.request_desc.customerAddress = null;
      this.request_desc.shipToState = null; 
      this.request_desc.deliveryLocationId = 0;
    }
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
      // this.myorder = this.product_desc;
      //console.log(this.myorder)
      this.addNewPanel = false;
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
  this.submitOrders();
  this.productDescriptionPanel = false;
  this.deliveryDetailsPanel  = true;
  //this.addNewPanel = false;
//  this.activetab = "product_description";
}

// onSubmit(){
//   let productDetails = new CheckOutAssistanceProductModel()
//   //Product details
//   productDetails.name = this.product_desc.name;
//   productDetails.quantity = this.product_desc.quantity;
//   productDetails.size = this.product_desc.size;
//   productDetails.color = this.product_desc.color;
//   productDetails.url = this.product_desc.url;
//   productDetails.delivery = this.product_desc.delivery
//   productDetails.itemNumber = this.product_desc.itemNumber
//   productDetails.comment = this.product_desc.comment;
//   productDetails.style = this.product_desc.style;

//   //Delivery Details
//   let RequestDetails = new CheckOutAssistanceModel();
//   this.activeUser.getAuthenticatedUserdatail().subscribe((data:ObjectResourceOfUserViewModel) => {
//     this.authuserdetails = data;
    
//     if(this.checkedIdx = true)
//     {
//       this.request_desc.checkoutProcessing = 'home';
//       this.request_desc.pickupCenter = null;
//     } else {
//       this.request_desc.checkoutProcessing = 'pickup';
//       this.request_desc.customerAddress = null;
//       this.request_desc.shipToState = null; 
//       this.request_desc.deliveryLocationId = 0;
//     }
  
//     RequestDetails.checkoutProcessing = this.request_desc.checkoutProcessing;
//     RequestDetails.customerAddress = this.authuserdetails.data.customer.homeAddress;
//     RequestDetails.customerName = this.authuserdetails.data.customer.fullName;
//     RequestDetails.customerPhone = this.authuserdetails.data.user.phoneNumber;
//     RequestDetails.shipToState = this.request_desc.shipToState;
//     RequestDetails.pickupCenter = this.request_desc.pickupCenter;
//     RequestDetails.deliveryLocationId = this.authuserdetails.data.customer.closestBustopId;
//     this.checkOutAsst.request;
//     this.checkOutAsst.products.push(productDetails);
//     this.checkOutAsst.request = RequestDetails;
//     console.log(this.checkOutAsst);
//     this.product_desc = new CheckOutAssistanceProductModel().clone();
//     this.request_desc = new CheckOutAssistanceModel().clone();
    
//   })

  
// }

  submitOrders() {
  
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
    this.checkOutAsst.products.push(productDetails);
   
    this.product_desc = new CheckOutAssistanceProductModel().clone(); 
    
  }

async finalsubmit(){
  const loading = await this.loadingCtrl.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...',
    duration: 2000
  });
  await loading.present();
  let RequestDetails = new CheckOutAssistanceModel();
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
  this.checkOutAsst.products.push(productDetails);
 
  this.AuthService.globalUser.subscribe((authuserdetails:any)=>{
    RequestDetails.shipToState = this.request_desc.shipToState;
    RequestDetails.pickupCenter = this.request_desc.pickupCenter;
    RequestDetails.checkoutProcessing = this.request_desc.checkoutProcessing;    
    
    RequestDetails.customerAddress = authuserdetails.customer.homeAddress;
    RequestDetails.customerName = authuserdetails.customer.fullName;
    RequestDetails.customerPhone = authuserdetails.user.phoneNumber;
    RequestDetails.deliveryLocationId = authuserdetails.customer.closestBustopId;   
    this.checkOutAsst.request = RequestDetails;
  })
  this.checkout.create(this.checkOutAsst).subscribe(async data => {      
    if(data.code == "000"){
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: data.message,
        color: "success"
      });
      toast.present();  
      this.product_desc = new CheckOutAssistanceProductModel().clone();
      this.request_desc = new CheckOutAssistanceModel().clone();
      this.checkOutAsst = new CheckOutAssistanceDTO().clone();
      this.checkOutAsst.products = [];
      loading.dismiss();
      this.router.navigate(['/checkoutlist'])
    } else{
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: data.message,
        color: "danger"
      });
      toast.present();
      loading.dismiss();
    }
   
  },async error=>{
    const toast = await this.toastCtrl.create({
      duration: 3000,
      message: "Oops! something went wrong",
      color: "danger"
    });
    toast.present();
    loading.dismiss();
  })
}
// saveOrder() {
//   this.gotoSummary();
  
// }


gotoSummary(){
  //this.onSubmit()
    //this.store.saveBookings(this.checkOutAsst)
    //this.router.navigate(['localdelivery/review-booking'])

}

}
