import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RidershistoryPageRoutingModule } from './ridershistory-routing.module';

import { RidershistoryPage } from './ridershistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RidershistoryPageRoutingModule
  ],
  declarations: [RidershistoryPage]
})
export class RidershistoryPageModule {}
