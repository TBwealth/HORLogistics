import { Component, OnInit } from '@angular/core';
import { NavController,MenuController } from '@ionic/angular';

@Component({
  selector: 'app-allriders',
  templateUrl: './allriders.page.html',
  styleUrls: ['./allriders.page.scss'],
})
export class AllridersPage implements OnInit {
  type: string;
  constructor(private navCtrl: NavController,
    private menu: MenuController) { }

  ngOnInit() {
    this.type = 'available';
  }
  goback(){
    this.navCtrl.back();
  }
}
