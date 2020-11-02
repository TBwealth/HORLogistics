import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-helpcenter',
  templateUrl: './helpcenter.page.html',
  styleUrls: ['./helpcenter.page.scss'],
})
export class HelpcenterPage implements OnInit {

  constructor(private navCtrl: NavController, private router: Router) { }
  goback(){
    this.navCtrl.back();
  }
  gotochat(){
this.router.navigate(['chat'])
  }
  ngOnInit() {
  }

}
