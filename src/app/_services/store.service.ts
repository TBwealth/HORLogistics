import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { CheckoutAssistance, ICheckoutAssistance, IInternationalBooking, ILocalBooking, InternationalBooking, LocalBooking } from '../_models/service-models';

interface APIListResult<T>{
  data: {
    items: T[],
    internationalBookings: T[],
    localBookings: T[]
  },
  code: string,
  message: string
}
export enum LOCAL_BOOKING_STATUS{
  Pending = 1,
  Approved = 7,
  Received = 2,
  Delivered = 5
}

export enum INTERNATIONAL_BOOKING_STATUS{
  Pending = 7,
  Approved = 8,
  Received = 1
}
export interface InternationalRoute{
  id?: number,
  adminFee?: number,
  exportRatePerUnitWeight?: number,
  convertExportRateToNaira?: boolean,
  importRatePerUnitWeight?: number,
  convertImportRateToNaira?: boolean,
  mininumQtyExport?: number,
  mininumQtyImport?: number,
  country?: string,
  currencySymbol?: string,
  currencyName?: string,
  exchangeRate?: number,
  deliveryTimeline?: string,
  canImport?: boolean,
  canExport?: boolean,
  weightSymbol?: string,
  weightName?: string,
  isActive?: boolean,
  markAsNew?: boolean,
  createdAt?: Date,
  updatedAt?: Date
}
interface APIRouteResult<T>{
  data: T[],
  code: string,
  message: string
}

enum BOOKING_TYPES {
  international = 1,
  local = 2
}

export class Booking{
  local: LocalBooking;
  international: InternationalBooking;
  type: BOOKING_TYPES
  isInternational: boolean

  fromInternationalBooking(booking: InternationalBooking){
    this.international = booking
    this.type = BOOKING_TYPES.international
    this.isInternational = true
    return this
  }
  fromLocalBooking(booking: LocalBooking){
    this.local = booking
    this.type = BOOKING_TYPES.local
    this.isInternational = false
    return this
  }
}
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  bookings: LocalBooking[] = []
  internationalBooking: InternationalBooking;

  constructor(
    private http: HttpClient,
    public storage: Storage,
  ) { }
  saveInternationalBooking(booking: InternationalBooking){
    this.internationalBooking = booking
  }
  getInternationalBookings(){
    return this.internationalBooking
  }
  saveBookings(bookings){
    this.bookings = bookings
    this.bookings.forEach(member => {
      member.deliveryDate = member.deliveryDate ? new Date(member.deliveryDate) : undefined
      member.createdAt = member.createdAt ? new Date(member.createdAt) : undefined
    })
    return this.storage.set('bookings', JSON.stringify(bookings))
  }
  async getBookings(){
    
    const bookings = JSON.parse(await this.storage.get('bookings'))
    const bookingList = []
    bookings.forEach(booking => {
      const tempBooking = new LocalBooking(booking)
      tempBooking.deliveryDate = tempBooking.deliveryDate ? new Date(tempBooking.deliveryDate) : undefined
      tempBooking.createdAt = tempBooking.createdAt ? new Date(tempBooking.createdAt) : undefined
      bookingList.push(tempBooking)
    })
    return bookingList
  }
  getAllLocalOrders(status: number=null){
    const subject = new Subject<LocalBooking[]>()
    this.http.get<APIListResult<ILocalBooking>>('http://104.40.215.33:8008/api/LocalBooking/getlocalbooking?Page=').subscribe(response => {
      if(response.code == '000'){
        const bookings = response.data.localBookings.map(iBooking => new LocalBooking(iBooking))
        subject.next(bookings)
        subject.complete()
      } else {
        if(response.code == '004'){}
        else{
          subject.error(response.message)
        }
      }
    })
    return subject
  }
  getAllInternationalBookings(booking_id: number=null){
    const subject = new Subject<InternationalBooking[]>()
    this.http.get<APIListResult<IInternationalBooking>>(`http://104.40.215.33:8008/api/internationalbooking/getintlbookings?Page=&Booking_Status=`).subscribe(response => {
      if(response.code == '000'){
        const bookings = response.data.internationalBookings.map(iBooking => new InternationalBooking(iBooking))
        subject.next(bookings)
        subject.complete()
      } else {
        if(response.code == '004'){
          
        }
        else{
          subject.error(response.message)
        }
      }
    })
    return subject
  }
  getInternationalRoutes(){
    const subject = new Subject<InternationalRoute[]>()
    this.http.get<APIRouteResult<InternationalRoute>>('http://104.40.215.33:8008/api/internationalbooking/internationlbookingRoute').subscribe(response => {
      if(response.code == '000'){
        subject.next(response.data)
        subject.complete()
      } else {
        if(response.code == '004'){}
        else{
          subject.error(response.message)
        }
      }
    })
    return subject
  }
  getCheckoutAssistances(booking_id: number=null){
    const subject = new Subject<CheckoutAssistance[]>()
    this.http.get<APIListResult<ICheckoutAssistance>>('http://104.40.215.33:8008/api/checkoutassistance/Getcheckassistance?Page=').subscribe(response => {
      if(response.code == '000'){
        const checkouts = response.data.items.map(iCheckout => new CheckoutAssistance(iCheckout))
        subject.next(checkouts)
        subject.complete()
      } else {
        subject.error(response.message)
      }
    })
    return subject
  }

}
