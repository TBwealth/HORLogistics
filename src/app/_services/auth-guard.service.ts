import { Injectable } from '@angular/core';
import { Router, CanActivate,ActivatedRoute,CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../_services/authentication.service';
import {  VerifiedPhoneUpdate,StatusResource, LoginResource } from "../_models/service-models";
@Injectable()
export class AuthGuardService implements CanLoad {
  constructor(public auth: AuthService, public router: Router, public storage: Storage,
    private AuthenService: AuthenticationService,) {}
    canLoad(): boolean {
    
    this.auth.isAuthenticated().then(data=>{  
      this.storage.set('returnUrl',this.router.url);   
      if(!data){      
        this.router.navigate(['preferedaction']);
        return false;
      }else{
        this.AuthenService.getuser().then((usersdata:LoginResource[])=>{
          if(usersdata.length > 0){
            if(!usersdata[0].isProfileComplete){
              this.router.navigate(['profilepage']);
            }
          }
        });
      }
    })
    return true;
  }
}
