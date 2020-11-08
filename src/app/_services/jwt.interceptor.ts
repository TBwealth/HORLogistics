import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { User, UserClass } from "../_models/user";
import { Storage } from '@ionic/storage';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    main_id = 0;
    user: User={}
    authstatus: boolean = false;
    constructor(public authServ: AuthenticationService,
        public storage: Storage
       ){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available       
           if (this.authServ.users.length > 0) {
            var token = this.authServ.users[0].token; 
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,                        
                }
            });
        }
  
        return next.handle(request);
    }
}