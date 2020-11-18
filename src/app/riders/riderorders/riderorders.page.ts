import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Dispatcher, LocalBooking, LocalBookingResource,MarkOrderAsDeliveredDTO,UpdateOrderByDispatcher } from 'src/app/_models/service-models';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MaprouteService } from 'src/app/_services/maproute.service';
import { LocalBookingServiceProxy, OrderServiceProxy, RiderServiceProxy } from 'src/app/_services/service-proxies';

import { JSXBase } from '../../../../node_modules/@ionic/core/dist/types/stencil-public-runtime';
import { AnimationBuilder, Mode, TextFieldTypes } from '../../../../node_modules/@ionic/core/dist/types/interface';

export interface AlertInputAttributes extends JSXBase.InputHTMLAttributes<HTMLInputElement> {
}
export interface AlertTextareaAttributes extends JSXBase.TextareaHTMLAttributes<HTMLTextAreaElement> {
}
export interface AlertInput {
  type?: TextFieldTypes | 'checkbox' | 'radio' | 'textarea';
  name?: string;
  placeholder?: string;
  value?: any;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  handler?: (input: AlertInput) => void;
  min?: string | number;
  max?: string | number;
  cssClass?: string | string[];
  attributes?: AlertInputAttributes | AlertTextareaAttributes;
}
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
orderStatus = [
  {statusName: 'Carry Over', statusId: 6},
  {statusName:'On transit', statusId: 3},
  {statusName:'Delivered', statusId: 5},
  {statusName:'Dispatched', statusId: 4}
]
loading: any;
pageSize = 1;
dispatcherId: number;
dispatcher = new Dispatcher().clone();
usersdata:any;
ListResourceOfOrder = [];
bookingStatus=[];
orderStatusResource = new UpdateOrderByDispatcher().clone();
MarkOrderAsDeliveredDTO = new MarkOrderAsDeliveredDTO().clone();
  constructor(private navCtrl: NavController,
    private alertController: AlertController,
    private loadspinner: LoadingController,
    private AuthenService: AuthenticationService,
    private riderService: RiderServiceProxy,
    private OorderService: OrderServiceProxy,
    private toastCtrl: ToastController,
    private router: Router,
    private localBookingService: LocalBookingServiceProxy,
    private maprouteService: MaprouteService,
    private spinnerLoader: LoadingController
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

var cIndex = this.orderStatus.find(x=>x.statusId == orderStatus);
if(cIndex.statusName == 'Delivered'){
  const toast = await this.toastCtrl.create({
    duration: 3000,
    message: 'Order Delivered',
    color: "danger"
  });
  toast.present();
}else{ 
  if(cIndex.statusName == 'On transit'){
    var alertInput:AlertInput[] = [
      {
      name: 'newOrderStatus',
      type: 'radio',
      label: 'Carry Over',
      value: 6,  
    },
    {
      name: 'newOrderStatus',
      type: 'radio',
      label: 'Delivered',
      value: 5,  
    },
  ];
  }
  if(cIndex.statusName == 'Dispatched'){
    var alertInput:AlertInput[] = [
      {
      name: 'newOrderStatus',
      type: 'radio',
      label: 'Carry Over',
      value: 6,  
    },
    {
      name: 'newOrderStatus',
      type: 'radio',
      label: 'On transit',
      value: 3,  
    },
  ];
  }
  if(cIndex.statusName == 'Carry Over'){
    var alertInput:AlertInput[] = [
    {
      name: 'newOrderStatus',
      type: 'radio',
      label: 'On transit',
      value: 3,  
    },
  ];
  }
  const alert = await this.alertController.create({
    cssClass: 'myalertradiocustom-class',
    header: 'New Order Status',
    inputs: alertInput,    
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
          const loading = await this.spinnerLoader.create({
            message: "please wait...",
            translucent: true,
            spinner: "bubbles",
          });
          loading.present()
          if(newOrderStatus){
            this.orderStatusResource.statusId = newOrderStatus;
            this.orderStatusResource.orderId = orderId;
            this.orderStatusResource.dispatcherId = this.dispatcherId;

            this.riderService.updateOrder(this.orderStatusResource).subscribe(async data=>{
              if(data.code == "000"){
                this.getAssignedOrder() 
                if(newOrderStatus == 5){
                  this.MarkOrderAsDeliveredDTO.dispatcherId = this.dispatcherId;
                  this.MarkOrderAsDeliveredDTO.orderId = orderId;
                  this.OorderService.markasdelivered(this.MarkOrderAsDeliveredDTO).subscribe(data=>{
                    console.log('marked as delivered')
                  })
                }
                const toast = await this.toastCtrl.create({
                  duration: 3000,
                  message: data.message,
                  color: "success"
                });
                toast.present();
                loading.dismiss()
              }else{
                const toast = await this.toastCtrl.create({
                  duration: 3000,
                  message: data.message,
                  color: "danger"
                });
                toast.present();
                loading.dismiss()
              }
            })
          }else{
            const toast = await this.toastCtrl.create({
              duration: 3000,
              message: 'Please select a status',
              color: "danger"
            });
            toast.present();
            loading.dismiss()
            return false;
          }
        }
      }
    ]
  });

  await alert.present();
 
 }  





   
 
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
    this.router.navigate(['assignedorderdetails'],{queryParams:{orderDetails: JSON.stringify(assignedOrder)}})
      }
  ngOnInit() {
  }

}
