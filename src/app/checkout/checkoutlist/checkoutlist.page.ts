import { CheckoutAssistance } from './../../_models/service-models';
import { CheckoutassistanceServiceProxy, ManageServiceProxy } from 'src/app/_services/service-proxies';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, NavController, ToastController,IonInfiniteScroll} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkoutlist',
  templateUrl: './checkoutlist.page.html',
  styleUrls: ['./checkoutlist.page.scss'],
})
export class CheckoutlistPage implements OnInit {
  @ViewChild(IonInfiniteScroll,{static:false,read:ElementRef}) infiniteScroll: IonInfiniteScroll;
  checkoutOrders: CheckoutAssistance[] = [];
  loading: any='';
  negativesearch: boolean = false;
  totaldata = [];
  constructor(private navCtrl: NavController,
    private checkout: CheckoutassistanceServiceProxy,
    private router: Router,
    private toastCtrl: ToastController,
    private loadspinner: LoadingController) { }

  ngOnInit() {
    this.getOrders();
  }
  doRefresh(event) {
    this.getOrders();
     console.log('Begin async operation');     
     setTimeout(() => {
       console.log('Async operation has ended');
       event.target.complete();
     }, 2000);    
 }
  goback(){
    this.navCtrl.back();
  }
  checkoutSummary(order){
this.router.navigate(['checkoutsummary'],{queryParams:{details:JSON.stringify(order)}})
  }
async getOrders(){
  this.loading = await this.loadspinner.create({
    message: "please wait...",
    translucent: true,
    spinner: "bubbles",
  });
  await this.loading.present();
  this.checkout.getcheckassistance('','',0,1).subscribe(async data => {
    if(data.code == "000"){
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: data.message,
        color: "success"
      });
      toast.present();
      this.checkoutOrders = data.data.items;
      this.totaldata =  data.data.items;
    }else{
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: data.message,
        color: "danger"
      });
      toast.present();
      if(data.code == "004"){
        this.router.navigate(['preferedaction'])
      }
    }
    this.loading.dismiss()
  },async error =>{
    const toast = await this.toastCtrl.create({
      duration: 3000,
      message: 'Oops! something went wrong',
      color: "danger"
    });
    toast.present();
    this.loading.dismiss()
  })
}
filtersearch(val){
  this.checkoutOrders = this.totaldata;
  const searchTerm = val;
  if (!searchTerm || searchTerm == "" || searchTerm == null) {    
    this.negativesearch = false;
    return false;
  }

  this.checkoutOrders = this.checkoutOrders.filter(currentOrder =>{
    if(currentOrder && searchTerm){
      if(currentOrder.bookingNumber.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
        this.negativesearch = false;
        return true;
      } else{
        this.negativesearch = true;
      }
    }
  })
}
loadData(event){
setTimeout(() => {
  event.target.complete();
}, 2000);
}
toggleInfiniteScroll() {
  this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
}
}
