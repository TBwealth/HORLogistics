import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiderroutePageRoutingModule } from './riderroute-routing.module';

import { RiderroutePage } from './riderroute.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiderroutePageRoutingModule
  ],
  declarations: [RiderroutePage]
})
export class RiderroutePageModule {}
