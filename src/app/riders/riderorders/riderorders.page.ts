import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Dispatcher, LocalBooking, LocalBookingResource,UpdateOrderByDispatcher } from 'src/app/_models/service-models';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MaprouteService } from 'src/app/_services/maproute.service';
import { LocalBookingServiceProxy, RiderServiceProxy } from 'src/app/_services/service-proxies';

@Component({
  selector: 'app-riderorders',
  templateUrl: './riderorders.page.html',
  styleUrls: ['./riderorders.page.scss'],
})
export class RiderordersPage implements OnInit {
  statusColor = {
    pending: '#EF6102',
    approved: '#049B1B',
    rejected: '#E1440B'
  }
orderStatus = ['In-Transit Pickup','Awaiting Delivery','In-Transit Delivery','Delivered']
loading: any;
pageSize = 1;
dispatcherId: number;
dispatcher = new Dispatcher().clone();
usersdata:any;
ListResourceOfOrder = [];
bookingStatus=[];
orderStatusResource = new UpdateOrderByDispatcher().clone();
  constructor(private navCtrl: NavController,
    private alertController: AlertController,
    private loadspinner: LoadingController,
    private AuthenService: AuthenticationService,
    private riderService: RiderServiceProxy,
    private toastCtrl: ToastController,
    private router: Router,
    private localBookingService: LocalBookingServiceProxy,
    private maprouteService: MaprouteService
    ) { 

    }
    ionViewWillEnter(){
      this.getAssignedOrder()  
      this.getbookingStatus()
    }
getbookingStatus(){
this.localBookingService.localbookingstatus().subscribe(data=>{
  this.bookingStatus = data.data;
})
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
this.riderService.getassignedorder(this.pageSize,this.dispatcherId).subscribe(async (res:any)=>{
  if(res.code == "000"){
    const toast = await this.toastCtrl.create({
      duration: 3000,
      message: res.message,
      color: "success"
    });
    toast.present();
    this.ListResourceOfOrder = res.data.items;
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
  goback(){
this.navCtrl.back()
  }
getOrderStatusName(statusId){
if(this.bookingStatus.length > 0){
var stFound = this.bookingStatus.find(x=>x.id == statusId);
return stFound.name
}else{
  return null
}
}
 async updateOrderStatus(orderStatus, orderId){
// var cIndex = this.orderStatus.findIndex(x=>x == orderStatus);
// if((cIndex + 1) >= this.orderStatus.length){
//   const toast = await this.toastCtrl.create({
//     duration: 3000,
//     message: 'Order Completed',
//     color: "danger"
//   });
//   toast.present();
// }else{  }  

    const alert = await this.alertController.create({
      cssClass: 'myalertradiocustom-class',
      header: 'New Order Status',
      inputs: [
        {
          name: 'newOrderStatus',
          type: 'radio',
          label: 'Carry Over',
          value: 6,  
        },
        {
          name: 'newOrderStatus',
          type: 'radio',
          label: 'Dispatched',
          value: 4,  
        },
        {
        name: 'newOrderStatus',
        type: 'radio',
        label: 'On transit',
        value: 3,  
      } ,
      {
        name: 'newOrderStatus',
        type: 'radio',
        label: 'Delivered',
        value: 5,  
      }
    ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertCtrlbtncancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Update',
          cssClass: 'alertCtrlbtnpry',
          handler: async (newOrderStatus) => {
            if(newOrderStatus){
              this.orderStatusResource.statusId = newOrderStatus;
              this.orderStatusResource.orderId = orderId;
            
              this.riderService.updateOrder(this.orderStatusResource).subscribe(async data=>{
                if(data.code == "000"){
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
                }
              })
            }else{
              const toast = await this.toastCtrl.create({
                duration: 3000,
                message: 'Please select a status',
                color: "danger"
              });
              toast.present();
              return false;
            }
          }
        }
      ]
    });

    await alert.present();

   
 
  }
  gotodirection(assignedOrder){
this.maprouteService.addressStart = assignedOrder.pickUpAddress;
this.maprouteService.addressEnd = assignedOrder.deliveryAddress;
this.maprouteService.mapType = "long"
this.router.navigate(['deliverydirection'])
  }

  gotoorderdetails(assignedOrder){
    this.maprouteService.addressStart = assignedOrder.pickUpAddress;
    this.maprouteService.addressEnd = assignedOrder.deliveryAddress;
    this.maprouteService.mapType = "short"
    this.router.navigate(['assignedorderdetails'],{queryParams:{orderDetails: assignedOrder}})
      }
  ngOnInit() {
  }

}
