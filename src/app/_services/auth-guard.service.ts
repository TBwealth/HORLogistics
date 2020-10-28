import { Injectable } from '@angular/core';
import { Router, CanActivate,ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router, public storage: Storage) {}
  canActivate(): boolean {
    
    this.auth.isAuthenticated().then(data=>{  
      this.storage.set('returnUrl',this.router.url);   
      if(!data){      
        this.router.navigate(['preferedaction']);
        return false;
      }else{

      }
    })
    return true;
  }
}
