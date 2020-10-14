import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocaldeliveryPageRoutingModule } from './localdelivery-routing.module';

import { LocaldeliveryPage } from './localdelivery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocaldeliveryPageRoutingModule
  ],
  declarations: [LocaldeliveryPage]
})
export class LocaldeliveryPageModule {}
