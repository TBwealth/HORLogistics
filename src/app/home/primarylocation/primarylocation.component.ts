
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-primarylocation',
  templateUrl: './primarylocation.component.html',
  styleUrls: ['./primarylocation.component.scss'],
})
export class PrimarylocationComponent implements OnInit {

  constructor(private popoverController: PopoverController, private router: Router) { }
  async DismissClick() {
    await this.popoverController.dismiss();
      }
     async gotoaddprimarylocation(){
        await this.popoverController.dismiss();
this.router.navigate(['addprimarylocation']);
      }
  ngOnInit() {}

}
