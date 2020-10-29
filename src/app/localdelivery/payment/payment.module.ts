import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPageRoutingModule } from './payment-routing.module';

import { PaymentPage } from './payment.page';
import { PageStructureComponent } from 'src/app/components/page-structure/page-structure.component';
import { SlideDownBoxComponent } from 'src/app/components/slide-down-box/slide-down-box.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentPageRoutingModule
  ],
  declarations: [
    PaymentPage,
    PageStructureComponent,
    SlideDownBoxComponent
  ]
})
export class PaymentPageModule {
  showPaymentOptions = {
    cash: true
  }
}
