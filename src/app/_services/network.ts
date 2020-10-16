import {Injectable} from '@angular/core';
import {Network} from "@ionic-native/network/ngx";
import { ToastController } from '@ionic/angular';

@Injectable()
export class NetworkProvider {
  static appOnline: boolean = true;

  constructor(
    private network: Network,
    private toast: ToastController) {}

  checkNetwork() {
    this.network.onConnect().subscribe(
      data => {
        this.displayNetworkUpdate(data.type);
      },
      error => console.error(error)
    );

    this.network.onDisconnect().subscribe(
      data => {
        this.displayNetworkUpdate(data.type);
      },
      error => console.error(error)
    );
  }

  checkNetworkSilent() {
    this.network.onConnect().subscribe(
      data => {
      },
      error => console.error(error)
    );

    this.network.onDisconnect().subscribe(
      data => {
      },
      error => console.error(error)
    );
  }

 async displayNetworkUpdate(connectionState: string) {
  const toastobj = await this.toast.create({
    message: `You are ${connectionState}`,
    duration: 5000
  });
  toastobj.present();
}
}
