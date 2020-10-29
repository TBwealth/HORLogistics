import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-page-structure',
  templateUrl: './page-structure.component.html',
  styleUrls: ['./page-structure.component.scss'],
})
export class PageStructureComponent implements OnInit {

  @Input() title = "Title"
  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {}

  goBack(){
    this.navCtrl.back()
  }

}
