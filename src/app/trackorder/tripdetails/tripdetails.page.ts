import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController, Platform } from '@ionic/angular';
import { from } from 'rxjs';
import { LocalbookingServiceProxy } from 'src/app/_services/service-proxies';
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
    private loadspinner: LoadingController,
    private activatedroute : ActivatedRoute,
    private localbookingService: LocalbookingServiceProxy
  ) { 
this.activatedroute.queryParams.subscribe(data=>{
if(data.orderNumber){
  this.localbookingService
}
});

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


