import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-delivery-type',
  templateUrl: './delivery-type.page.html',
  styleUrls: ['./delivery-type.page.scss'],
})
export class DeliveryTypePage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  goback(){
    this.navCtrl.back();
  }

}
