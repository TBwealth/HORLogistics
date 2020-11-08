import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-riderorders',
  templateUrl: './riderorders.page.html',
  styleUrls: ['./riderorders.page.scss'],
})
export class RiderordersPage implements OnInit {
  statusColor = {
    pending: '#EF6102',
    approved: '#049B1B',
    rejected: '#E1440B'
  }
  constructor(private navCtrl: NavController,
    private alertController: AlertController) { }
  goback(){
this.navCtrl.back()
  }

 async updateOrderStatus(){
    const alert = await this.alertController.create({
      cssClass: 'myalertradiocustom-class',
      header: 'New Order Status',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'In-transit pickup ',
          value: 'value1',

        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Awaiting delivery ',
          value: 'value2'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'In-transit delivery ',
          value: 'value3'
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Delivered',
          value: 'value4'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertCtrlbtncancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Update',
          cssClass: 'alertCtrlbtnpry',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
 
  }
  ngOnInit() {
  }

}
