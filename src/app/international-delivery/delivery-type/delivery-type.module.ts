import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryTypePageRoutingModule } from './delivery-type-routing.module';

import { DeliveryTypePage } from './delivery-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryTypePageRoutingModule
  ],
  declarations: [DeliveryTypePage]
})
export class DeliveryTypePageModule {}
