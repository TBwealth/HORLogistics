import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutlistPageRoutingModule } from './checkoutlist-routing.module';

import { CheckoutlistPage } from './checkoutlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutlistPageRoutingModule
  ],
  declarations: [CheckoutlistPage]
})
export class CheckoutlistPageModule {}
