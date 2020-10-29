import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.page.html',
  styleUrls: ['./profilepage.page.scss'],
})
export class ProfilepagePage implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) { }
  goback(){
    this.navCtrl.back();
  }
  ngOnInit() {
  }

}
