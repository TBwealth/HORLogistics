import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location, ResidentialState } from 'src/app/_models/service-models';
import { LocationsServiceProxy } from 'src/app/_services/service-proxies';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  @Input() set value(val: number){
    this.location = val
  }
  @Output() valueChange = new EventEmitter<number>()
  location: number;
  state: number;
  states: ResidentialState[];
  locations: Location[];
  

  constructor(
    private locationService: LocationsServiceProxy
  ) { }

  ngOnInit() {
    this.locationService.getOfficeState().subscribe(data => {
      this.states = data.data
    })
  }

  stateChanged(){
    // this.state = 
    this.locationService.getLocationinstate(this.state).subscribe(data => {
      this.locations = data.data
    })
  }

  locationChanged(){
    alert(this.location)
    this.valueChange.emit(this.location)
  }

}
