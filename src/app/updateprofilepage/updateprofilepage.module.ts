import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateprofilepagePageRoutingModule } from './updateprofilepage-routing.module';

import { UpdateprofilepagePage } from './updateprofilepage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateprofilepagePageRoutingModule
  ],
  declarations: [UpdateprofilepagePage]
})
export class UpdateprofilepagePageModule {}
