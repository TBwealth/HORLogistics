import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleorderPageRoutingModule } from './singleorder-routing.module';

import { SingleorderPage } from './singleorder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleorderPageRoutingModule
  ],
  declarations: [SingleorderPage]
})
export class SingleorderPageModule {}
