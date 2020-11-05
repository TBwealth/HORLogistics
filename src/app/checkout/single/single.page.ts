// import { CheckoutAssistance } from './../../_services/service-proxies';
import { product_descriptionModel} from './../../_models/checkout';
import { FormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { NavController,ToastController,AlertController} from '@ionic/angular';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-single',
  templateUrl: './single.page.html',
  styleUrls: ['./single.page.scss'],
})
export class SinglePage implements OnInit {

  checkedIdx = true;
  activetab:string = "";
  homedelivery:string = ""
  
  myorder: product_descriptionModel = {};
    
  productDescriptionPanel: boolean = false;
  deliveryDetailsPanel: boolean = true;
  
  product_descriptionForm :FormGroup;
  delivery_detailsForm : FormGroup;

  // delivery_details : delivery_details = {};
  // product_description : product_descriptionModel ={};
  product_desc : product_descriptionModel = {};


  constructor(private toastCtrl: ToastController,
    private router: Router,
    private navCtrl: NavController,
    private activatedroute: ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.product_desc);
  }

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

if(this.product_desc.product_name &&
   this.product_desc.product_url &&
    this.product_desc.delivery_type &&
     this.product_desc.color && this.product_desc.size){
  this.deliveryDetailsPanel = false;
}else{

  //this.deliveryDetailsPanel = true;
// this.productDescriptionPanel = true;
}
}

validateDeliveryDetailsForm(){
if(this.product_desc.location &&
   this.product_desc.state &&
   this.product_desc.address){
       
    this.myorder = this.product_desc;
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
