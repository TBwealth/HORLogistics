import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocaldeliveryPageRoutingModule } from './localdelivery-routing.module';

import { LocaldeliveryPage } from './localdelivery.page';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';
import { TextInputComponent } from '../components/text-input/text-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LocaldeliveryPageRoutingModule
  ],
  declarations: [LocaldeliveryPage, CheckboxComponent, TextInputComponent]
})
export class LocaldeliveryPageModule {}
