import { Component, OnInit } from '@angular/core';
import { LocationsServiceProxy } from 'src/app/_services/service-proxies';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  location: number;
  state: number;

  constructor(
    private locationService: LocationsServiceProxy
  ) { }

  ngOnInit() {
  }

}
