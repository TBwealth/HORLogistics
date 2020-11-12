import { Injectable } from '@angular/core';
import {customConfig} from "../custumConfig";
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from "../environment";
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class TrackerapiService {
  Urlbase: string = environment.trackerbaseUrl;
  token :string = environment.trackerToken;

  constructor(public http: HttpClient,private nhttp: HTTP) { }
  trackOrder(plateNumber){
    let trackData={
      type:'recent',
      token: this.token,
      list: plateNumber
    }
    const body = new HttpParams()
    .set('type', 'recent')
    .set('token', this.token)
    .set('list', plateNumber);
    let endPoint: string = '';
    return this.nhttp.post(this.Urlbase + endPoint,body, { headers: {'Content-Type': 'application/x-www-form-urlencoded'}})

  }
  
  riderSummary(plateNumber){
let trackData={
  type:'summary',
  token: this.token,
  list: plateNumber,
  from: new Date(),
  to: new Date(),
  stopmins: 5
}
    return this.nhttp.post(this.Urlbase,trackData,{'Content-Type': 'application/x-www-form-urlencoded'})

  }
  
  private handleError<T> (operation = 'operation', result?:T)
  {
      return (error: any): Observable<T> => {
         
          return of(error);
      }
  }
}
