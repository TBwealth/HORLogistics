import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { LocalBooking } from 'src/app/_models/service-models';
import { MaprouteService } from 'src/app/_services/maproute.service';
import { LocalBookingServiceProxy, RouteRateServiceProxy } from 'src/app/_services/service-proxies';
import { StoreService } from 'src/app/_services/store.service';

@Component({
  selector: 'app-review-booking',
  templateUrl: './review-booking.page.html',
  styleUrls: ['./review-booking.page.scss'],
})
export class ReviewBookingPage implements OnInit {
  bookings: LocalBooking[];
  booking: LocalBooking;
  totalPayment = 0;
  constructor(
    private maproute: MaprouteService,
    private store: StoreService,
    private bookingService: LocalBookingServiceProxy,
    private localRouteRateService: RouteRateServiceProxy,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    this.bookings = this.store.getBookings()
    console.log(this.bookings)
    this.booking = this.bookings[0]
    this.maproute.addressEnd = this.booking.deliveryAddress;
    this.maproute.addressStart = this.booking.pickUpAddress;
    this.localRouteRateService.delivery_type(this.booking.pickupLocationId, this.booking.deliveryLocationId, this.booking.deliveryTypeId, this.booking.localBookingCategoryId).subscribe(response => {
      const rate  = response.localRouteRate.generalRate
      this.totalPayment = (this.booking.isInsured ? 0.01 * this.booking.packageValue : 0)  + rate
    })
  }

  async SubmitBookings(){
    const loading = await this.loadingController.create({
      message: "please wait...",
      translucent: true,
      spinner: "bubbles",
    })
    loading.present()
    
    this.bookingService.createorder(this.booking).subscribe(async(data) => {
      loading.dismiss()
      if(data.code == '000'){
        this.loadingController.dismiss()
        const toast = await this.toastController.create({
          message: 'Booking created successfully',
          duration: 2000
        });
        toast.present();
        this.router.navigate(['/orders'])
      } else {
        const toast = await this.toastController.create({
          message: data.message,
          duration: 2000
        });
        toast.present();
      }
    })
    // const promises = this.bookings.map(booking => {
    //   this.bookingService.createorder(booking).toPromise()
    // })
    // Promise.all(promises).then(data => {
    //   // this.toastController.create()
    // })
  }

}
