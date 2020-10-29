import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ShipmentoptionsPageRoutingModule } from './shipmentoptions-routing.module';

import { ShipmentoptionsPage } from './shipmentoptions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShipmentoptionsPageRoutingModule
  ],
  declarations: [ShipmentoptionsPage]
})
export class ShipmentoptionsPageModule {



}
