import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-preferedaction',
  templateUrl: './preferedaction.page.html',
  styleUrls: ['./preferedaction.page.scss'],
})
export class PreferedactionPage implements OnInit {

  constructor(private router: Router) { }
  gotoplaceorder(usersType){
this.router.navigate(['loginsigninoptions'],{queryParams:{usersType:usersType}});
  }
  gotoriderorder(usersType){
this.router.navigate(['loginsigninoptions'],{queryParams:{usersType:usersType}})
  }
  ngOnInit() {
  }

}
