import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllchatsPageRoutingModule } from './allchats-routing.module';

import { AllchatsPage } from './allchats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllchatsPageRoutingModule
  ],
  declarations: [AllchatsPage]
})
export class AllchatsPageModule {}
