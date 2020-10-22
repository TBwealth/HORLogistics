import { Injectable } from '@angular/core';
import { delay, share } from 'rxjs/operators';
import { ICountry} from '../_models/country.type';
import {Countries, Country} from "../_models/country.model";
import {HttpClient,HttpClientModule} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CountryserviceService {
  allitem: Country[] = [];
  private countries: ICountry[]; 
  constructor(private http: HttpClient) {
}
setItems() {
  let Ncountry = [];
  this.http.get('assets/countries.json').toPromise().then(
    (res: Countries) => {
 this.allitem = res.countries;
 
 this.allitem.forEach(county =>{
   Ncountry.push(new ICountry({
    name :county.name,
    flag :county.flag,
    alpha2Code : county.alpha2Code,
    callingCodes:"+"+county.callingCodes['0']
   })) 
 })
 
    }
  );

  return Ncountry;
}

getCountryFlag(alphaCode){  
  let Ncountry = [];
  let newFlag = "";
  this.http.get('assets/countries.json').toPromise().then(
    (res: Countries) => {
 this.allitem = res.countries;
 this.allitem.forEach(county=>{
   if(county.alpha2Code == alphaCode){
    let newObj = {
      name :county.name,
      flag :county.flag,
      alpha2Code : county.alpha2Code,
      callingCodes:"+"+county.callingCodes['0']
     }
     Ncountry.push(newObj)
   }
   
 })
    });
  return Ncountry;
}

}
