import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-bookingoptions',
  templateUrl: './bookingoptions.page.html',
  styleUrls: ['./bookingoptions.page.scss'],
})
export class BookingoptionsPage implements OnInit {

  constructor(private router: Router,
    private navCtrl: NavController,
    private activatedroute: ActivatedRoute) { }


  ngOnInit() {
  }

  goback(){
    this.navCtrl.back();
  }

}
