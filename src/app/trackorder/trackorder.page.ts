import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-trackorder',
  templateUrl: './trackorder.page.html',
  styleUrls: ['./trackorder.page.scss'],
})
export class TrackorderPage implements OnInit {
  trackForm: FormGroup;
  orderTrackNumber: any = '';
  constructor(private navCtrl: NavController,private router: Router,
    private toastCtrl: ToastController,) { }
  goback(){
    this.navCtrl.back();
  }
  async gototripdetails(){
    if(this.orderTrackNumber){
      this.router.navigate(['tripdetails'],{queryParams:{orderNumber: this.orderTrackNumber}})

    }else{
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: 'Please input Booking Number',
        color: "danger"
      });
      toast.present();
    }

  }
  ngOnInit() {
  }

}
