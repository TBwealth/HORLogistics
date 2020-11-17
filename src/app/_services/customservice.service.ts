import { Injectable } from '@angular/core';
import {customConfig} from "../custumConfig";
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from "../environment";
import { HTTP } from '@ionic-native/http/ngx';
import { FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Injectable({
  providedIn: 'root'
})
export class CustomserviceService {
  Urlbase = customConfig.baseUrl;
  fileTransfer: FileTransferObject;
  constructor(public http: HttpClient, private nhttp: HTTP) { }

  public uploadFile(formData){
    let endPoint: string = this.Urlbase + '/api/Account/uploadprofilepic';
    let options = {headers: new HttpHeaders({'Content-Type': 'multipart/form-data;'})}        
    return this.nhttp.post(endPoint, formData,{})
   
  }

  filetransfer(nativepath,fileoptions){
    fileoptions.headers = new HttpHeaders(
      {'Content-Type': 'application/json'});    
  let endPoint: string = '/api/Rider/RiderDocuments';  
  return new Promise ((resolve,reject)=>{
    this.fileTransfer.upload(nativepath,this.Urlbase + endPoint,fileoptions,false).then(data=>{
      console.log(data);
      resolve(data);
      },(error)=>{
        console.log('file upload error:',JSON.stringify(error))
      });
  })
}
  private handleError<T> (operation = 'operation', result?:T)
  {
      return (error: any): Observable<T> => {
         
          return of(error);
      }
  }
}
