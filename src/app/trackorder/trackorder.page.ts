import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-trackorder',
  templateUrl: './trackorder.page.html',
  styleUrls: ['./trackorder.page.scss'],
})
export class TrackorderPage implements OnInit {
  trackForm: FormGroup;
  orderTrackNumber: any = '';
  constructor(private navCtrl: NavController,private router: Router) { }
  goback(){
    this.navCtrl.back();
  }
  gototripdetails(){
this.router.navigate(['tripdetails'])
  }
  ngOnInit() {
  }

}
