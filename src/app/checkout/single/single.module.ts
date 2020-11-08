import { CheckboxComponent } from './../../components/checkbox/checkbox.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinglePageRoutingModule } from './single-routing.module';

import { SinglePage } from './single.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SinglePageRoutingModule
  ],
  declarations: [SinglePage, CheckboxComponent]
})
export class SinglePageModule {}
