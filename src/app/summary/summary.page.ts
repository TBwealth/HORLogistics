import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goback(){
    this.navCtrl.back();
  }

}
