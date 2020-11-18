import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { BookingStatus, CheckoutAssistance, InternationalBooking, ISelectedOrder, LocalBooking, LocalBookingStatusResource, SelectedOrder } from '../_models/service-models';
import { InternationalbookingServiceProxy, IntlBookingStatus, LocalBookingServiceProxy } from '../_services/service-proxies';
import { Booking, INTERNATIONAL_BOOKING_STATUS, LOCAL_BOOKING_STATUS, StoreService } from '../_services/store.service';
import { PaystackOptions } from 'angular4-paystack';
import { AuthenticationService } from '../_services/authentication.service';

enum SEGMENTS {
  PENDING,
  APPROVED,
  REJECTED
}

const COMPLETED_LOCAL_BOOKING_STATUS = [LOCAL_BOOKING_STATUS.Received, LOCAL_BOOKING_STATUS.Delivered]
const COMPLETED_INTERNATIONAL_BOOKING_STATUS = [INTERNATIONAL_BOOKING_STATUS.Received]
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  statusColor = {
    pending: '#EF6102',
    approved: '#049B1B',
    rejected: '#E1440B'
  }

  // localBookings: LocalBooking[];

  SEGMENTS = SEGMENTS
  selectedSegment = SEGMENTS.PENDING
  localBookings: LocalBooking[] = []
  internationalBookings: InternationalBooking[] = []
  bookings: Booking[]
  checkouts: CheckoutAssistance[] = []
  filteredLocalBookings: LocalBooking[] = []
  filteredInternationalBookings: InternationalBooking[]
  options: PaystackOptions = {
    amount: 50000,
    email: 'user@mail.com',
    ref: `${Math.ceil(Math.random() * 10e10)}`
  }
  reference = '';
  constructor(
    private localBookingService: LocalBookingServiceProxy,
    private internationalBookingService: InternationalbookingServiceProxy,
    private store: StoreService,
    private spinnerLoader: LoadingController,
    private router: Router,
    private toastCtrl: ToastController,
    private AuthenService: AuthenticationService,
    private alertController : AlertController
  ) { }
  paymentInit(){

  }
  paymentCancel(){}
  paymentDone(event){}
  
async openBankInfo(){
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'HOR Bank - FCMB',
    subHeader: 'Account Name: House of Ravissant Ltd',
    message: 'Account Number: 5756034045',
    buttons: ['OK']
  });

  await alert.present();
}
  async gototripdetails(bookingNumber){
    if(bookingNumber){
      this.router.navigate(['tripdetails'],{queryParams:{orderNumber: bookingNumber}})

    }else{
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: 'Invalid Booking Number',
        color: "danger"
      });
      toast.present();
    }

  }
  async getintials(){
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    const loading = await this.spinnerLoader.create({
      message: "please wait...",
      translucent: true,
      spinner: "bubbles",
    });
    loading.present()
    let localBookingStatus: LocalBookingStatusResource[];
    let internationalBookingStatus: IntlBookingStatus[]
    const promise = await Promise.all([this.store.getAllLocalOrders().toPromise(), this.store.getAllInternationalBookings().toPromise(), this.store.getCheckoutAssistances().toPromise(),
      this.localBookingService.localbookingstatus().toPromise(),
      this.internationalBookingService.intlbookingstatus().toPromise()])
    localBookingStatus = promise[3].data
    internationalBookingStatus = promise[4].data
    this.localBookings = promise[0]
    this.localBookings.forEach(member => {
      const status: any = localBookingStatus.find(status => member.bookingStatusId == status.id)
      member.bookingStatus = new BookingStatus(status) 
    })
    this.internationalBookings = promise[1]
    this.internationalBookings.forEach(member => {
      member.bookingStatus = internationalBookingStatus.find(status => member.bookingStatusId == status.id)
    })
    this.checkouts = promise[2]
    loading.dismiss()
    const LBookings: Booking[] = this.localBookings.map(booking => new Booking().fromLocalBooking(booking))
    const IBookings: Booking[] = this.internationalBookings.map(booking => new Booking().fromInternationalBooking(booking))
    this.bookings = [...IBookings, ...LBookings]
    this.filterInProgress()
  }
  doRefresh(event) {
    this.getintials();
     console.log('Begin async operation');     
     setTimeout(() => {
       console.log('Async operation has ended');
       event.target.complete();
     }, 2000);    
 }
   ngOnInit() {
   this.getintials()
  }
  filterInProgress(){
    this.filteredLocalBookings = this.localBookings.filter(booking => !COMPLETED_LOCAL_BOOKING_STATUS.includes(booking.bookingStatusId))
    this.filteredInternationalBookings = this.internationalBookings.filter(booking => !COMPLETED_INTERNATIONAL_BOOKING_STATUS.includes(booking.bookingStatusId))
  }
  filterCompleted(){
    this.filteredLocalBookings = this.localBookings.filter(booking => COMPLETED_LOCAL_BOOKING_STATUS.includes(booking.bookingStatusId))
    this.filteredInternationalBookings = this.internationalBookings.filter(booking => COMPLETED_INTERNATIONAL_BOOKING_STATUS.includes(booking.bookingStatusId))
  }
  segmentChanged(segment){
    this.selectedSegment = segment
    if(segment == SEGMENTS.APPROVED){
      this.filterCompleted()
    } else {
      this.filterInProgress()
    }
  }

  selectLocalBooking(booking){
    this.store.saveBookings([booking])
    this.router.navigate(['localdelivery/review-booking'])
  }
  selectInternationalBooking(booking){
    this.store.saveInternationalBooking(booking)
    this.router.navigate(['international-delivery/summary'])
  }

}
