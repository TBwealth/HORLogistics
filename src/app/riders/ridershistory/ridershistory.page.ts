import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Dispatcher } from 'src/app/_models/service-models';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MaprouteService } from 'src/app/_services/maproute.service';
import { LocalBookingServiceProxy, RiderServiceProxy } from 'src/app/_services/service-proxies';

enum SEGMENTS {
  PENDING,
  COMPLETED,
}
@Component({
  selector: 'app-ridershistory',
  templateUrl: './ridershistory.page.html',
  styleUrls: ['./ridershistory.page.scss'],
})
export class RidershistoryPage implements OnInit {
  statusColor = {
    pending: '#EF6102',
    completed: '#049B1B',
  }
  SEGMENTS = SEGMENTS
  selectedSegment = SEGMENTS.PENDING
  loading: any;
  usersdata:any;
  dispatcher = new Dispatcher().clone();
  dispatcherId: number;
  ListResourceOfOrder = [];
  pageNumber: number = 1;
  bookingStatus=[];
  constructor(private navCtrl: NavController,
    private router: Router,
    private toastCtrl: ToastController,
    private alertController: AlertController,
    private loadspinner: LoadingController,
    private riderService: RiderServiceProxy,
    private AuthenService: AuthenticationService,
    private maprouteService: MaprouteService,
    private localBookingService: LocalBookingServiceProxy,) { }

    ionViewWillEnter(){
      this.getAssignedOrder();
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
  async getAssignedOrder(){
    this.loading = await this.loadspinner.create({
      message: "please wait...",
      translucent: true,
      spinner: "bubbles",
    });
    await this.loading.present();

    setTimeout(() => {
      if (this.AuthenService.users.length > 0) {
    
        this.usersdata = this.AuthenService.users[0]          
        this.dispatcher = this.usersdata.dispatcher;
   
        this.dispatcherId = this.dispatcher.id;
this.riderService.getcompltedOrder(this.dispatcherId,'',this.pageNumber).subscribe(async (res:any)=>{
if(res.code == "000"){
  const toast = await this.toastCtrl.create({
    duration: 3000,
    message: res.message,
    color: "success"
  });
  toast.present();
  this.ListResourceOfOrder = res.data.localBookings;
}else{
  if(res.code == "004"){
    const toast = await this.toastCtrl.create({
      duration: 3000,
      message: 'Unauthorized Call',
      color: "danger"
    });
    toast.present();
    this.router.navigate(['preferedaction']);
  }
}

});
      }
      this.loading.dismiss()
    }, 2000);
  }


  segmentChanged(segment){
    this.selectedSegment = segment

  }

  goback(){
    this.navCtrl.back()
      }

      gotoorderdetails(assignedOrder){
        this.maprouteService.addressStart = assignedOrder.pickUpAddress;
        this.maprouteService.addressEnd = assignedOrder.deliveryAddress;
        this.maprouteService.mapType = "short"
        this.router.navigate(['assignedorderdetails'],{queryParams:{orderDetails: JSON.stringify(assignedOrder)}})
          }
  ngOnInit() {
  }

}
