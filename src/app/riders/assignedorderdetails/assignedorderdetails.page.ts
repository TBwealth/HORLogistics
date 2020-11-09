import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MaprouteService } from 'src/app/_services/maproute.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-assignedorderdetails',
  templateUrl: './assignedorderdetails.page.html',
  styleUrls: ['./assignedorderdetails.page.scss'],
})
export class AssignedorderdetailsPage implements OnInit {
orderdetails: any = "";
  constructor(private maproute: MaprouteService,
    private navCtrl: NavController,
    private callNumber: CallNumber,
    private activatedrouter: ActivatedRoute) {
this.activatedrouter.queryParams.subscribe(data=>{
  if(data.orderDetails){
this.orderdetails = data.orderDetails;
  }
})
     }

NumberDialer(phoneNumber){
  this.callNumber.callNumber(phoneNumber, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
}
     goback(){
      this.navCtrl.back();
    }
  ngOnInit() {
  }

}
