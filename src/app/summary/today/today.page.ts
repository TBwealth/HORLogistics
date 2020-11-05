import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-today',
  templateUrl: './today.page.html',
  styleUrls: ['./today.page.scss'],
})
export class TodayPage implements OnInit {


  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goback(){
    this.navCtrl.back();
  }

}
