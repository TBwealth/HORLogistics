import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-checkoutsummary',
  templateUrl: './checkoutsummary.page.html',
  styleUrls: ['./checkoutsummary.page.scss'],
})
export class CheckoutsummaryPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goback(){
    this.navCtrl.back();
  }

}
