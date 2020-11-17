import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllridersPageRoutingModule } from './allriders-routing.module';

import { AllridersPage } from './allriders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllridersPageRoutingModule
  ],
  declarations: [AllridersPage]
})
export class AllridersPageModule {}
