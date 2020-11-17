import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllqueriesPageRoutingModule } from './allqueries-routing.module';

import { AllqueriesPage } from './allqueries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllqueriesPageRoutingModule
  ],
  declarations: [AllqueriesPage]
})
export class AllqueriesPageModule {}
