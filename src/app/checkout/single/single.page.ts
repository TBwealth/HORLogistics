import { ICheckOutAssistanceDTO } from './../../_models/service-models';
import { ManageServiceProxy } from './../../_services/service-proxies';
import { FormsModule, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { NavController,ToastController,AlertController} from '@ionic/angular';
import { CheckoutassistanceServiceProxy } from 'src/app/_services/service-proxies';
import { CheckOutAssistanceProductModel,CheckOutAssistanceDTO,CheckoutAssistance, CheckOutAssistanceModel,ObjectResourceOfUserViewModel } from 'src/app/_models/service-models';
import { NeworderComponent } from './../neworder/neworder.component';
import { PopoverController } from '@ionic/angular';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-single',
  templateUrl: './single.page.html',
  styleUrls: ['./single.page.scss'],
})
export class SinglePage implements OnInit {
  isSingle = true;
  checkedIdx = true;
  activetab:string = "";
  homedelivery:string = ""
  authuserdetails = new ObjectResourceOfUserViewModel().clone();
  myorder: CheckOutAssistanceProductModel = new CheckOutAssistanceProductModel ();

   
  productDescriptionPanel: boolean = false;
  deliveryDetailsPanel: boolean = true;
  
 myForm :FormGroup = new FormGroup({});
  delivery_detailsForm : FormGroup;

  // delivery_details : delivery_details = {};
  // product_description : product_descriptionModel ={};
  product_desc = new CheckOutAssistanceProductModel().clone();
  request_desc = new CheckOutAssistanceModel().clone();
  all_product_desc: CheckOutAssistanceProductModel[];
  
  checkOutAsst = new CheckOutAssistanceDTO().clone();
  addNewPanel: boolean = true;
  
  constructor(private toastCtrl: ToastController,
    private router: Router,
    public popoverController: PopoverController,
    private navCtrl: NavController,
    private activatedroute: ActivatedRoute,
    private checkout: CheckoutassistanceServiceProxy,
    private activeUser: ManageServiceProxy) { }

  ngOnInit() {
    this.activatedroute.queryParamMap.subscribe(data => {
      this.isSingle = data.get('single') == 'true';
      this.checkOutAsst.products = [];
    })
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
    this.onSubmit();
    this.productDescriptionPanel = false
    this.deliveryDetailsPanel  = false
    this.activetab = "";
  }

  
gotoSummary(){
  this.onSubmit()
  
}
  get myUser(){
   return this.activeUser.getAuthenticatedUserdatail().subscribe((data:ObjectResourceOfUserViewModel) => {
this.authuserdetails = data;
console.log(this.authuserdetails)
   });
  }

  onReset(){
    this.myForm.reset();
  }
  addProduct(){
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
    this.activeUser.getAuthenticatedUserdatail().subscribe((data:ObjectResourceOfUserViewModel) => {
      this.authuserdetails = data;
      
      if(this.checkedIdx = true)
      {
        this.request_desc.checkoutProcessing = 'home';
        this.request_desc.pickupCenter = null;
      } else {
        this.request_desc.checkoutProcessing = 'pickup';
        this.request_desc.customerAddress = null;
        this.request_desc.shipToState = null; 
        this.request_desc.deliveryLocationId = 0;
      }
      RequestDetails.checkoutProcessing = this.request_desc.checkoutProcessing;
      RequestDetails.customerAddress = this.authuserdetails.data.customer.homeAddress;
      RequestDetails.customerName = this.authuserdetails.data.customer.fullName;
      RequestDetails.customerPhone = this.authuserdetails.data.user.phoneNumber;
      RequestDetails.shipToState = this.request_desc.shipToState;
      RequestDetails.pickupCenter = this.request_desc.pickupCenter;
      RequestDetails.deliveryLocationId = this.authuserdetails.data.customer.closestBustopId;
      this.checkOutAsst.request;
      this.checkOutAsst.products.push(productDetails);
      this.checkOutAsst.request = RequestDetails;
      console.log(this.checkOutAsst);
      
      
      this.product_desc = new CheckOutAssistanceProductModel().clone();
      this.request_desc = new CheckOutAssistanceModel().clone();
      
    })
  
    
  }
  onSubmit(){
    this.addProduct()
      this.checkout.create(this.checkOutAsst).subscribe(data => {})
    }

    //console.log(this.checkOutAsst);
  
    //  let singleProduct = new 
  //     console.log(myForm.value);
  //     this.checkout.create(myForm.value).subscribe(data => {})
    

//   addPost(form: NgForm){
//     // this.newPost = {
//     //     title: this.title,
//     //     body: this.body
//     // }
//     // this._postService.addPost(this.newPost);
//     form.resetForm(); // or form.reset();
// }
    
  goback(){
    this.navCtrl.back();
  }

  // home_delivery($option){
  //   this.homedelivery = $option;
  // }

  yesfn(event){
    if(event.detail.checked) this.checkedIdx = true;
    this.homedelivery = "yeshome";
    console.log(event.checked);
  }

  nofn(event){
    if(event.detail.checked) this.checkedIdx = false;
    this.homedelivery = "nohome";
    console.log(event.checked);
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
}else{

  //this.deliveryDetailsPanel = true;
// this.productDescriptionPanel = true;
}
}

validateDeliveryDetailsForm(){
if(this.request_desc.customerAddress &&
   this.request_desc.deliveryLocationId &&
   this.request_desc.shipToState){
       
    this.myorder = this.product_desc;
    this.addNewPanel = false;
    //console.log(this.myorder)
}
}

myoption(event) {
  this.homedelivery = event.detail.value;
  // console.log(event.detail.value)
  // alert(event.detail.value)
}

// get diagnostic() { return JSON.stringify(this.product_desc); }

}
