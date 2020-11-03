import { NeworderComponent } from './../neworder/neworder.component';
import { Component, OnInit } from '@angular/core';
import { product_descriptionModel} from './../../_models/checkout';
import { FormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import { NavController,ToastController,AlertController} from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Subject } from 'rxjs';

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


  // delivery_details : delivery_details = {};
  // product_description : product_descriptionModel ={};
  product_desc : product_descriptionModel = {};

  orders = {};
  

  constructor(private toastCtrl: ToastController,
    private router: Router,
    private navCtrl: NavController,
    public popoverController: PopoverController,
    private activatedroute: ActivatedRoute) { }

  
      async addOrder(ev: any) {
        const popover = await this.popoverController.create({
          component: NeworderComponent,
          cssClass: 'my-custom-class',
          event: ev,
          translucent: true
        });
        return await popover.present();
      }
  //   }
  //   async showAddNewOrderModal(){
  //   const subject = new Subject<boolean>()
  //   const modal = await this.popoverController.create({
  //     component: NeworderComponent,
  //     cssClass: 'my-custom-class',
  //     componentProps: {
  //       subject
  //     }
  //   });
  //   subject.subscribe(val => {
  //     modal.dismiss()
  //     if(val){
  //       this.clearForm()
  //     } else {
  //       this.gotoSummary()
  //     }
  //   })
  //   return await modal.present();
  // }

  // clearForm(){
    
  // }
  // gotoSummary(){
  //   // this.router.navigate(['localdelivery/review-booking'])
  // }

  ngOnInit() {
  }


  
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
  console.log(this.product_desc.home_delivery);
if(this.product_desc.home_delivery &&
  this.product_desc.location &&
   this.product_desc.state){
       
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



}