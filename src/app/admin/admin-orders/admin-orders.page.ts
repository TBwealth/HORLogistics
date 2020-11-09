import { NavController,MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.page.html',
  styleUrls: ['./admin-orders.page.scss'],
})
export class AdminOrdersPage implements OnInit {

  constructor(private navCtrl: NavController,
    private menu: MenuController) { }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  goback(){
    this.navCtrl.back();
  }

  openMenu(){
    this.menu.open();
      }

}
