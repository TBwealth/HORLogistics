import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-checkoutlist',
  templateUrl: './checkoutlist.page.html',
  styleUrls: ['./checkoutlist.page.scss'],
})
export class CheckoutlistPage implements OnInit {

  orderId = "Trnx20484";
  orderDate = "17/11/2020"
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goback(){
    this.navCtrl.back();
  }

}
