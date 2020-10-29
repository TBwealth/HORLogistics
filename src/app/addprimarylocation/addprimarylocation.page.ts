import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-addprimarylocation',
  templateUrl: './addprimarylocation.page.html',
  styleUrls: ['./addprimarylocation.page.scss'],
})
export class AddprimarylocationPage implements OnInit {
  addressForm: FormGroup;
  pryAddress: any = '';
  constructor(   private navCtrl: NavController,) { }
  goback(){
    this.navCtrl.back();
  }
  ngOnInit() {
  }

}
