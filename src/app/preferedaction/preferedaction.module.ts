import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreferedactionPageRoutingModule } from './preferedaction-routing.module';

import { PreferedactionPage } from './preferedaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreferedactionPageRoutingModule
  ],
  declarations: [PreferedactionPage]
})
export class PreferedactionPageModule {}
