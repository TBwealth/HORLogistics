import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

enum SEGMENTS {
  PENDING,
  COMPLETED,
}
@Component({
  selector: 'app-ridershistory',
  templateUrl: './ridershistory.page.html',
  styleUrls: ['./ridershistory.page.scss'],
})
export class RidershistoryPage implements OnInit {
  statusColor = {
    pending: '#EF6102',
    completed: '#049B1B',
  }
  SEGMENTS = SEGMENTS
  selectedSegment = SEGMENTS.PENDING
  constructor(private navCtrl: NavController) { }
  segmentChanged(segment){
    this.selectedSegment = segment

  }
  goback(){
    this.navCtrl.back()
      }
  ngOnInit() {
  }

}
