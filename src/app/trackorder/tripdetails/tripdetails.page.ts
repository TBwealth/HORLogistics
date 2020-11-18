import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { from } from 'rxjs';
import { BookingStatus, LocalBooking, LocalBookingStatusResource } from 'src/app/_models/service-models';
import { LocalBookingServiceProxy, LocalbookingServiceProxy } from 'src/app/_services/service-proxies';
import { TrackerapiService } from 'src/app/_services/trackerapi.service';
import {MaprouteService} from '../../_services/maproute.service';

interface VehicleLocation {
  altitude?: number,
  angle?:  number,
  dt_server?: Date
  dt_tracker?: Date,
  lat?: number,
  lng?: number,
  loc_valid?: boolean
}
@Component({
  selector: 'app-tripdetails',
  templateUrl: './tripdetails.page.html',
  styleUrls: ['./tripdetails.page.scss'],
})
export class TripdetailsPage implements OnInit {
  trackingDetails: VehicleLocation = {};
  coords: Coordinates;
  loading: any;
  orderDetails: LocalBooking = new LocalBooking();
  bookingStatus: LocalBookingStatusResource[]=[];
  constructor(private navCtrl: NavController, 
    public platform:Platform, 
    public alertCtrl: AlertController,
    private maproute: MaprouteService,
    private loadspinner: LoadingController,
    private activatedroute : ActivatedRoute,
    private toastCtrl: ToastController,
    private router: Router,
    private localBookingService: LocalBookingServiceProxy,
    private trackerAPi: TrackerapiService
  ) { 

   
    }
    ionViewWillEnter(){
      this. getbookingStatus();
    }
    getbookingStatus(){
      this.localBookingService.localbookingstatus().subscribe(data=>{
        this.bookingStatus = data.data;
      })
      }
    getOrderStatusName(statusId){
      statusId = this.orderDetails.bookingStatusId
      if(this.bookingStatus.length > 0){
      var stFound = this.bookingStatus.find(x=>x.id == statusId);
      console.log(this.bookingStatus)
      console.log(statusId)
      return stFound.name
      }else{
        return null
      }
      }
  goback(){
    this.router.navigate(['home']);
  }


 async ngOnInit() {
  this.activatedroute.queryParams.subscribe(async data=>{
    if(data.orderNumber){
      this.loading = await this.loadspinner.create({
        message: "please wait...",
        translucent: true,
        spinner: "bubbles",
      });
      await this.loading.present();
      this.localBookingService.trackorder(data.orderNumber).subscribe(async data=>{
        if(data.code == "000"){
          this.orderDetails = data.data;         
          const trackStatus = [4]
          if(this.orderDetails.bookingStatusId == 3){
            const plateNo =this.orderDetails.dispatcher.plateNumber
            this.trackerAPi.trackOrder(plateNo).then(response => {
              const trackingDetails: VehicleLocation = response.data[plateNo]
              trackingDetails.lat = Number(trackingDetails.lat)
              trackingDetails.lng = Number(trackingDetails.lng)
              this.trackingDetails = trackingDetails
              this.coords = {
                accuracy: 1,
                speed: 1,
                altitude: 1,
                altitudeAccuracy: 1,
                heading: 1,
                longitude: this.trackingDetails.lng,
                latitude: this.trackingDetails.lat
              }
            })
          }     

          this.localBookingService.localbookingstatus().subscribe(data=>{
            this.bookingStatus = data.data;
            const bookingStatusObj: any = this.bookingStatus.find(status => status.id == this.orderDetails.bookingStatusId)
            this.orderDetails.bookingStatus = new BookingStatus(bookingStatusObj)
          })
    
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
          this.loading.dismiss();
          const toast = await this.toastCtrl.create({
            duration: 3000,
            message: data.message,
            color: "danger"
          });
          toast.present();
          if(data.code == "004"){
            this.router.navigate(['login']);
          }
          this.router.navigate(['trackorder']);
        }
        
    
      },async error =>{
        this.loading.dismiss();
        const toast = await this.toastCtrl.create({
          duration: 3000,
          message: 'Oops! something went wrong',
          color: "danger"
        });
        toast.present();
        this.router.navigate(['trackorder']);
      })
    }
    });
    
  this.getbookingStatus()
  }

}


