import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LocalBooking } from 'src/app/_models/service-models';
import { MaprouteService } from 'src/app/_services/maproute.service';
import { LocalBookingServiceProxy } from 'src/app/_services/service-proxies';
import { StoreService } from 'src/app/_services/store.service';

@Component({
  selector: 'app-review-booking',
  templateUrl: './review-booking.page.html',
  styleUrls: ['./review-booking.page.scss'],
})
export class ReviewBookingPage implements OnInit {
  bookings: LocalBooking[];

  constructor(
    private maproute: MaprouteService,
    private store: StoreService,
    private bookingService: LocalBookingServiceProxy,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.maproute.addressEnd = "13, Church street, Makoko Lagos";
    this.maproute.addressStart = "7, Amore street, off Freedom way, Lekki, Lagos";
    this.bookings = this.store.getBookings()
    console.log(this.bookings)
  }

  SubmitBookings(){
    const promises = this.bookings.map(booking => {
      this.bookingService.createorder(booking).toPromise()
    })
    Promise.all(promises).then(data => {
      // this.toastController.create()
    })
  }

}
