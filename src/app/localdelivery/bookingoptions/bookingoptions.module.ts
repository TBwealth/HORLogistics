import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingoptionsPageRoutingModule } from './bookingoptions-routing.module';

import { BookingoptionsPage } from './bookingoptions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingoptionsPageRoutingModule
  ],
  declarations: [BookingoptionsPage]
})
export class BookingoptionsPageModule {}
