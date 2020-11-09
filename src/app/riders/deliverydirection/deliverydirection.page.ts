import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MaprouteService } from 'src/app/_services/maproute.service';

@Component({
  selector: 'app-deliverydirection',
  templateUrl: './deliverydirection.page.html',
  styleUrls: ['./deliverydirection.page.scss'],
})
export class DeliverydirectionPage implements OnInit {

  constructor(private maproute: MaprouteService,
    private navCtrl: NavController) { }
    goback(){
      this.navCtrl.back();
    }
  ngOnInit() {
  }

}
