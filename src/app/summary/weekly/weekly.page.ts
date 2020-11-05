import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.page.html',
  styleUrls: ['./weekly.page.scss'],
})
export class WeeklyPage implements OnInit {

 
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goback(){
    this.navCtrl.back();
  }
}
