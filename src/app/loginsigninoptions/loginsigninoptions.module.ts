import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginsigninoptionsPageRoutingModule } from './loginsigninoptions-routing.module';

import { LoginsigninoptionsPage } from './loginsigninoptions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginsigninoptionsPageRoutingModule
  ],
  declarations: [LoginsigninoptionsPage]
})
export class LoginsigninoptionsPageModule {}
