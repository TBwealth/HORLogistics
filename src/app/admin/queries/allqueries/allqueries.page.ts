import { Component, OnInit } from '@angular/core';
import { NavController,MenuController } from '@ionic/angular';

@Component({
  selector: 'app-allqueries',
  templateUrl: './allqueries.page.html',
  styleUrls: ['./allqueries.page.scss'],
})
export class AllqueriesPage implements OnInit {

  constructor(private navCtrl: NavController,
    private menu: MenuController) { }

  ngOnInit() {
  }
  goback(){
    this.navCtrl.back();
  }


}
