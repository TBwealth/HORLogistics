import { CheckoutAssistance } from './../../_models/service-models';
import { CheckoutassistanceServiceProxy, ManageServiceProxy } from 'src/app/_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-checkoutlist',
  templateUrl: './checkoutlist.page.html',
  styleUrls: ['./checkoutlist.page.scss'],
})
export class CheckoutlistPage implements OnInit {

  checkoutOrders: CheckoutAssistance[] = [];

  constructor(private navCtrl: NavController,
    private checkout: CheckoutassistanceServiceProxy) { }

  ngOnInit() {
    this.getOrders();
  }

  goback(){
    this.navCtrl.back();
  }

getOrders(){
  this.checkout.getcheckassistance('','',0,1).subscribe(data => {
    this.checkoutOrders = data.data.items;
  })
}

}
