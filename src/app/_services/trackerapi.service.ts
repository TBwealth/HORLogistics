import { Injectable } from '@angular/core';
import {customConfig} from "../custumConfig";
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from "../environment";
@Injectable({
  providedIn: 'root'
})
export class TrackerapiService {
  Urlbase: string = environment.trackerbaseUrl;
  token :string = environment.trackerToken;

  constructor(public http: HttpClient) { }

  trackOrder(plateNumber){
    let trackData={
      type:'summary',
      token: this.token,
      list: plateNumber,
      from: new Date(),
      to: new Date(),
      stopmins: 5
    }
    let endPoint: string = '/api/Account/Register';
    return this.http.post(this.Urlbase + endPoint,trackData)
    .pipe(catchError(this.handleError<any>('userRegistration')));
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
    return this.http.post(this.Urlbase,trackData)
    .pipe(catchError(this.handleError<any>('userRegistration')));
  }
  
  private handleError<T> (operation = 'operation', result?:T)
  {
      return (error: any): Observable<T> => {
         
          return of(error);
      }
  }
}
