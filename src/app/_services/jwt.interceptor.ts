import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { User, UserClass } from "../_models/user";


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
        this.storage.get('user').then((users)=>{   
            if(users){
                this.user = users[0];               
                if (this.user) {
                    var token = this.user.main_session_token;                  
                    request = request.clone({
                        setHeaders: { 
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,                        
                        }
                    });
                }
            }else{

            }
        });
     
        return next.handle(request);
    }
}