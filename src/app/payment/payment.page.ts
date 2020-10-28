import { Component, OnInit } from '@angular/core';
import { NavController,ToastController,AlertController} from '@ionic/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  activetab:string = "";
  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  goback(){
    this.navCtrl.back();
  }

  myfunction($val){
    this.activetab = $val;
  }

  changecolor(event){
    console.log(event)
  }

}
