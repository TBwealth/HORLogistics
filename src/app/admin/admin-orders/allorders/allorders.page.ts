import { Component, OnInit } from '@angular/core';
import { NavController,MenuController } from '@ionic/angular';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.page.html',
  styleUrls: ['./allorders.page.scss'],
})
export class AllordersPage implements OnInit {

  constructor(private navCtrl: NavController,
    private menu: MenuController) { }

  ngOnInit() {
  }
  goback(){
    this.navCtrl.back();
  }
}
