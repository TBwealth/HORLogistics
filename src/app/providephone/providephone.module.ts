import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProvidephonePageRoutingModule } from './providephone-routing.module';

import { ProvidephonePage } from './providephone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProvidephonePageRoutingModule
  ],
  declarations: [ProvidephonePage]
})
export class ProvidephonePageModule {}
