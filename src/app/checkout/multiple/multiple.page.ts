import { LocationsServiceProxy } from './../../_services/service-proxies';
import { AuthService } from './../../_services/auth.service';
import { NeworderComponent } from './../neworder/neworder.component';
import { Component, OnInit,EventEmitter, Input, Output  } from '@angular/core';
import {FormGroup } from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { CheckoutassistanceServiceProxy, ManageServiceProxy } from 'src/app/_services/service-proxies';
import { CheckOutAssistanceProductModel, CheckOutAssistanceDTO, CheckOutAssistanceModel, ObjectResourceOfUserViewModel, ResidentialState, Location } from 'src/app/_models/service-models';
import { AuthenticationService } from 'src/app/_services/authentication.service';


@Component({
  selector: 'app-multiple',
  templateUrl: './multiple.page.html',
  styleUrls: ['./multiple.page.scss'],
})
export class MultiplePage implements OnInit {
  // @Input() set value(val: number){
  //   this.location = val
  // }
  // @Output() valueChange = new EventEmitter<number>()
  // location: number;
  // state: number;

  isMultiple = false;
  checkedIdx = true;
  activetab:string = "";
  homedelivery:string = ""
  totalOrders = [];
  loading: any;
  myState:ResidentialState[]= [];
  myLocation: Location[] = [];
    
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
    private loadingCtrl: LoadingController,
    private stateOffice: LocationsServiceProxy) { }

  ngOnInit() {
    this.getOfficeState();
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
  this.request_desc.checkoutProcessing = this.request_desc.checkoutProcessing == 'pickup'? 'pickup' :'home';
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
}


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
  console.log(this.request_desc);
  if( this.request_desc.checkoutProcessing == 'home'){
if((this.request_desc.customerAddress == "" || this.request_desc.customerAddress == undefined) || (this.request_desc.shipToState == "" || this.request_desc.shipToState == undefined) || (this.request_desc.deliveryLocationId == 0 || this.request_desc.deliveryLocationId == undefined))
  {
    const toast = await this.toastCtrl.create({
      duration: 3000,
      message: "Please fill delivery details",
      color: "danger"
    });
    toast.present();
   return false
  }
  }else{
    if(this.request_desc.checkoutProcessing == 'pickup'){
if(this.request_desc.pickupCenter == undefined || this.request_desc.pickupCenter == ""){
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: "Please select pickup center",
        color: "danger"
      });
      toast.present();
      return false
}
    }else{
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: "Please fill delivery details",
        color: "danger"
      });
      toast.present();
      return false
    }
  }
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
this.router.navigate(['checkoutsummary'],{queryParams:{details:JSON.stringify(this.checkOutAsst),FormSubmit:true}});
      this.product_desc = new CheckOutAssistanceProductModel().clone();
      this.request_desc = new CheckOutAssistanceModel().clone();
      this.checkOutAsst = new CheckOutAssistanceDTO().clone();
      this.checkOutAsst.products = [];
      this.productDescriptionPanel = false;
      this.deliveryDetailsPanel  = true;
      loading.dismiss();

  // this.checkout.create(this.checkOutAsst).subscribe(async data => {      
  //   if(data.code == "000"){
  //     const toast = await this.toastCtrl.create({
  //       duration: 3000,
  //       message: data.message,
  //       color: "success"
  //     });
  //     toast.present();  
  //     this.product_desc = new CheckOutAssistanceProductModel().clone();
  //     this.request_desc = new CheckOutAssistanceModel().clone();
  //     this.checkOutAsst = new CheckOutAssistanceDTO().clone();
  //     this.checkOutAsst.products = [];
  //     loading.dismiss();
  //     this.router.navigate(['/checkoutlist'])
  //   } else{
  //     const toast = await this.toastCtrl.create({
  //       duration: 3000,
  //       message: data.message,
  //       color: "danger"
  //     });
  //     toast.present();
  //     loading.dismiss();
  //   }
   
  // },async error=>{
  //   const toast = await this.toastCtrl.create({
  //     duration: 3000,
  //     message: "Oops! something went wrong",
  //     color: "danger"
  //   });
  //   toast.present();
  //   loading.dismiss();
  // })
}

async getLocation(stateId){
  const loading = await this.loadingCtrl.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...',
    duration: 2000
  });
  await loading.present();
  this.stateOffice.getLocationinstate(stateId).subscribe(data => {
    if(data.code == "000"){
      this.myLocation = data.data;
      loading.dismiss();
    }else{
      loading.dismiss();
      if(data.code == "004"){
this.router.navigate(['preferedaction'])
      }
    }
    
  },async error=>{
    loading.dismiss();
    const toast = await this.toastCtrl.create({
      duration: 3000,
      message: "Oops! something went wrong",
      color: "danger"
    });
    toast.present();
  })
}
getOfficeState(){
  this.stateOffice.getOfficeState().subscribe(data => {
    this.myState = data.data;
    console.log(this.myState);
  })
}

//  locationChanged(){
//     this.valueChange.emit(this.location)
//   }

gotoSummary(){

    //this.store.saveBookings(this.checkOutAsst)
    //this.router.navigate(['localdelivery/review-booking'])

}

}
