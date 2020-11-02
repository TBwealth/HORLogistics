import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { NavController,ToastController,AlertController} from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  constructor(
    private toastCtrl: ToastController,
    private router: Router,
    private navCtrl: NavController,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
  }
  
  
  goback(){
    this.navCtrl.back();
  }

}
