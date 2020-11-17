import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliverydirectionPageRoutingModule } from './deliverydirection-routing.module';

import { DeliverydirectionPage } from './deliverydirection.page';

import { RiderroutePage } from '../riderroute/riderroute.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliverydirectionPageRoutingModule
  ],
  declarations: [DeliverydirectionPage,RiderroutePage]
})
export class DeliverydirectionPageModule {}
