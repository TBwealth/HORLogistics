import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { from } from 'rxjs';
import { LocalBookingServiceProxy, LocalbookingServiceProxy } from 'src/app/_services/service-proxies';
import {MaprouteService} from '../../_services/maproute.service';

@Component({
  selector: 'app-tripdetails',
  templateUrl: './tripdetails.page.html',
  styleUrls: ['./tripdetails.page.scss'],
})
export class TripdetailsPage implements OnInit {

  loading: any;
  orderDetails: any = "";
  bookingStatus=[];
  constructor(private navCtrl: NavController, 
    public platform:Platform, 
    public alertCtrl: AlertController,
    private maproute: MaprouteService,
    private loadspinner: LoadingController,
    private activatedroute : ActivatedRoute,
    private localbookingService: LocalBookingServiceProxy,
    private toastCtrl: ToastController,
    private router: Router,
    private localBookingService: LocalBookingServiceProxy,
  ) { 
this.activatedroute.queryParams.subscribe(async data=>{
if(data.orderNumber){
  this.loading = await this.loadspinner.create({
    message: "please wait...",
    translucent: true,
    spinner: "bubbles",
  });
  await this.loading.present();
  this.localbookingService.trackorder(data.orderNumber).subscribe(async data=>{
    if(data.code == "000"){
      this.orderDetails = data.data;

      this.maproute.addressStart = this.orderDetails.pickUpAddress;
      this.maproute.addressEnd = this.orderDetails.deliveryAddress;
      this.loading.dismiss();
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: data.message,
        color: "success"
      });
      toast.present();
    }else{
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: data.message,
        color: "danger"
      });
      toast.present();
      if(data.code == "004"){
        this.router.navigate(['login']);
      }
    }
    

  })
}
});

   
    }
    ionViewWillEnter(){
      this.getbookingStatus()
    }
    getbookingStatus(){
      this.localBookingService.localbookingstatus().subscribe(data=>{
        this.bookingStatus = data.data;
      })
      }
    getOrderStatusName(statusId){
      if(this.bookingStatus.length > 0){
      var stFound = this.bookingStatus.find(x=>x.id == statusId);
      return stFound.name
      }else{
        return null
      }
      }
  goback(){
    this.navCtrl.back();
  }


 async ngOnInit() {

  }

}


