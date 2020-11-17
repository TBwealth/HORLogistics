import { Component, OnInit } from '@angular/core';
import { NavController,MenuController } from '@ionic/angular';
@Component({
  selector: 'app-queries',
  templateUrl: './queries.page.html',
  styleUrls: ['./queries.page.scss'],
})
export class QueriesPage implements OnInit {

  constructor(private navCtrl: NavController,
    private menu: MenuController) { }

  ngOnInit() {
  }
  goback(){
    this.navCtrl.back();
  }

  validateQueryForm(){

  }

  submitQuery(){
    
  }
}
