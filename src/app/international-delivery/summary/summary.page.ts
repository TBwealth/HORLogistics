import { Component, OnInit } from '@angular/core';
import { MaprouteService } from 'src/app/_services/maproute.service';
import { InternationalbookingServiceProxy } from 'src/app/_services/service-proxies';
import { StoreService } from 'src/app/_services/store.service';
import * as moment from 'moment'

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  constructor(
    private routeService: MaprouteService,
    private store: StoreService,
    private internationalBookingService: InternationalbookingServiceProxy
  ) { }

  ngOnInit() {
    this.routeService.addressStart = "7, Amore street, off Freedom way, Lekki, Lagos";
    this.routeService.addressEnd = "13, Church street, Makoko Lagos"
  }

  submit(){
    const booking = this.store.getInternationalBookings()
    booking.eta = new Date(booking.eta);
    this.internationalBookingService.createIntlBooking(booking).subscribe(data => {})
  }

}
