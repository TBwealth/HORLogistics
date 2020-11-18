import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutsummaryPageRoutingModule } from './checkoutsummary-routing.module';

import { CheckoutsummaryPage } from './checkoutsummary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutsummaryPageRoutingModule
  ],
  declarations: [CheckoutsummaryPage]
})
export class CheckoutsummaryPageModule {}
