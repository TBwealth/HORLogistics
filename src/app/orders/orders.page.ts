import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CheckoutAssistance, InternationalBooking, ISelectedOrder, LocalBooking, Order, SelectedOrder } from '../_models/service-models';
import { InternationalbookingServiceProxy, LocalBookingServiceProxy, OrderServiceProxy, OrdersServiceProxy } from '../_services/service-proxies';
import { Booking, INTERNATIONAL_BOOKING_STATUS, LOCAL_BOOKING_STATUS, StoreService } from '../_services/store.service';

enum SEGMENTS {
  PENDING,
  APPROVED,
  REJECTED
}

const COMPLETED_LOCAL_BOOKING_STATUS = [LOCAL_BOOKING_STATUS.Received]
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

  constructor(
    private localBookingService: LocalBookingServiceProxy,
    private internationalBookingService: InternationalbookingServiceProxy,
    private store: StoreService,
    private spinnerLoader: LoadingController,
    private router: Router
  ) { }

  async ngOnInit() {
    const loading = await this.spinnerLoader.create({
      message: "please wait...",
      translucent: true,
      spinner: "bubbles",
    });
    loading.present()
    const promise = await Promise.all([this.store.getAllLocalOrders().toPromise(), this.store.getAllInternationalBookings().toPromise(), this.store.getCheckoutAssistances().toPromise()])
    this.localBookings = promise[0]
    this.internationalBookings = promise[1]
    this.checkouts = promise[2]
    loading.dismiss()
    const LBookings: Booking[] = this.localBookings.map(booking => new Booking().fromLocalBooking(booking))
    const IBookings: Booking[] = this.internationalBookings.map(booking => new Booking().fromInternationalBooking(booking))
    this.bookings = [...IBookings, ...LBookings]
    this.filterInProgress()
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
