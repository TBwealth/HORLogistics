import { Component, OnInit } from '@angular/core';
import { MaprouteService } from 'src/app/_services/maproute.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  constructor(
    private routeService: MaprouteService
  ) { }

  ngOnInit() {
    this.routeService.addressStart = "7, Amore street, off Freedom way, Lekki, Lagos";
    this.routeService.addressEnd = "13, Church street, Makoko Lagos"
  }

}
