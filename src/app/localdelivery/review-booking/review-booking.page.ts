import { Component, OnInit } from '@angular/core';
import { MaprouteService } from 'src/app/_services/maproute.service';

@Component({
  selector: 'app-review-booking',
  templateUrl: './review-booking.page.html',
  styleUrls: ['./review-booking.page.scss'],
})
export class ReviewBookingPage implements OnInit {

  constructor(
    private maproute: MaprouteService
  ) { }

  ngOnInit() {
    this.maproute.addressEnd = "13, Church street, Makoko Lagos";
    this.maproute.addressStart = "7, Amore street, off Freedom way, Lekki, Lagos";
  }

}
