import { Injectable } from '@angular/core';
import { InternationalBooking, LocalBooking, LocalBookingResource } from '../_models/service-models';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  bookings: LocalBooking[] = []
  internationalBooking: InternationalBooking;

  constructor() { }
  saveInternationalBooking(booking: InternationalBooking){
    this.internationalBooking = booking
  }
  getInternationalBookings(){
    return this.internationalBooking
  }
  saveBookings(bookings){
    this.bookings = bookings
  }
  getBookings(){
    return this.bookings
  }
}
