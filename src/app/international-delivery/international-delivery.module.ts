import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InternationalDeliveryPageRoutingModule } from './international-delivery-routing.module';

import { InternationalDeliveryPage } from './international-delivery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InternationalDeliveryPageRoutingModule
  ],
  declarations: [InternationalDeliveryPage]
})
export class InternationalDeliveryPageModule {}
