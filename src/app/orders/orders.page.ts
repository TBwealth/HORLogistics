import { Component, OnInit } from '@angular/core';
import { InternationalBooking, ISelectedOrder, LocalBooking, SelectedOrder } from '../_models/service-models';
import { InternationalbookingServiceProxy, LocalBookingServiceProxy, OrderServiceProxy, OrdersServiceProxy } from '../_services/service-proxies';

enum SEGMENTS {
  PENDING,
  APPROVED,
  REJECTED
}
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

  SEGMENTS = SEGMENTS
  selectedSegment = SEGMENTS.PENDING
  localBookings: LocalBooking[] = []
  internationalBookings: InternationalBooking[] = []


  constructor(
    private localBookingService: LocalBookingServiceProxy,
    private internationalBookingService: InternationalbookingServiceProxy
  ) { }

  ngOnInit() {
    this.localBookingService.getlocalbooking(null, null, null, null, null, null, null, null, null, null, null, null).subscribe(data => {
      this.localBookings = data.data.items
    })
    this.internationalBookingService.getintlbookings(null,null,null,null).subscribe(data => {
      this.internationalBookings = data.data.items
    })
  }
  segmentChanged(segment){
    this.selectedSegment = segment
  }

}
