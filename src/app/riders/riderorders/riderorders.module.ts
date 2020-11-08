import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiderordersPageRoutingModule } from './riderorders-routing.module';

import { RiderordersPage } from './riderorders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiderordersPageRoutingModule
  ],
  declarations: [RiderordersPage]
})
export class RiderordersPageModule {}
