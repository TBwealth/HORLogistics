import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddprimarylocationPageRoutingModule } from './addprimarylocation-routing.module';

import { AddprimarylocationPage } from './addprimarylocation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddprimarylocationPageRoutingModule
  ],
  declarations: [AddprimarylocationPage]
})
export class AddprimarylocationPageModule {}
