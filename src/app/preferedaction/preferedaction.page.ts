import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-preferedaction',
  templateUrl: './preferedaction.page.html',
  styleUrls: ['./preferedaction.page.scss'],
})
export class PreferedactionPage implements OnInit {

  constructor(private router: Router) { }
  gotoplaceorder(){
this.router.navigate(['loginsigninoptions']);
  }
  gotoriderorder(){
this.router.navigate([''])
  }
  ngOnInit() {
  }

}
