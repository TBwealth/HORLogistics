import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InternationalDeliveryPageRoutingModule } from './international-delivery-routing.module';

import { InternationalDeliveryPage } from './international-delivery.page';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';
import { PhoneSelectorComponent } from '../components/phone-selector/phone-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InternationalDeliveryPageRoutingModule
  ],
  declarations: [InternationalDeliveryPage, CheckboxComponent, PhoneSelectorComponent]
})
export class InternationalDeliveryPageModule {}
