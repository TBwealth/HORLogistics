import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface NamedDirection{
  to: string,
  from: string
}
@Injectable({
  providedIn: 'root'
})
export class MaprouteService {
  subject = new Subject<NamedDirection>()
  from: string;
  to: string;
  set addressStart(val: string){
    this.from = val
    this.drawRoute()
  }
  set addressEnd(val: string){
    this.to = val
    this.drawRoute()
  }

  get addressStart(){
    return this.from
  }

  get addressEnd(){
    return this.to
  }
  drawRoute(){
    if(this.to && this.from){
      this.subject.next({from: this.from, to: this.to})
    }
  }
  mapType: any;
  constructor() { }
}
