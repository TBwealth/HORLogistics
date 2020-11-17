import { AssignriderComponent } from './assignrider/assignrider.component';
import { NavController, MenuController, PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.page.html',
  styleUrls: ['./admin-orders.page.scss'],
})
export class AdminOrdersPage implements OnInit {
  type: string;
  
  constructor(private navCtrl: NavController,
    private menu: MenuController,public popoverController: PopoverController) { }

  ngOnInit() {
    this.type = 'pending';
  }

  async assignRider(){
    const subject = new Subject<boolean>()
    const modal = await this.popoverController.create({
      component: AssignriderComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        subject
      }
    });
    subject.subscribe(val => {
      modal.dismiss()
      if(val){
        this.riderAssign()
      } else {
        this.gotoSummary()
      }
    })
    return await modal.present();
  }

  riderAssign(){
    console.log("Rider assigned")
  }

  gotoSummary(){
    console.log("I don't want")

  }


  goback(){
    this.navCtrl.back();
  }

  openMenu(){
    this.menu.open();
      }

}
