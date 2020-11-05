import { Injectable } from '@angular/core';
import { LocalBooking, LocalBookingResource } from '../_models/service-models';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  bookings: LocalBooking[] = []

  constructor() { }
  
  saveBookings(bookings){
    this.bookings = bookings
  }
  getBookings(){
    return this.bookings
  }
}
