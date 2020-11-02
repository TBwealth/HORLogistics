import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, Platform } from '@ionic/angular';
import { from } from 'rxjs';
import {MaprouteService} from '../../_services/maproute.service';

@Component({
  selector: 'app-tripdetails',
  templateUrl: './tripdetails.page.html',
  styleUrls: ['./tripdetails.page.scss'],
})
export class TripdetailsPage implements OnInit {
  addressStart: any = "13, Church street, Makoko Lagos";
  addressEnd: any = "7, Amore street, off Freedom way, Lekki, Lagos";
  loading: any
  constructor(private navCtrl: NavController, 
    public platform:Platform, 
    public alertCtrl: AlertController,
    private maproute: MaprouteService,
    private loadspinner: LoadingController
  ) { 
     maproute.addressEnd = this.addressEnd;
     maproute.addressStart = this.addressStart;
    }
   
  goback(){
    this.navCtrl.back();
  }


 async ngOnInit() {
    this.loading = await this.loadspinner.create({
      message: "please wait...",
      translucent: true,
      spinner: "bubbles",
    });
    await this.loading.present();
    setTimeout(() => {
      this.loading.dismiss()
    }, 3000);
  }

}
