import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerspartneroptionPageRoutingModule } from './customerspartneroption-routing.module';

import { CustomerspartneroptionPage } from './customerspartneroption.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerspartneroptionPageRoutingModule
  ],
  declarations: [CustomerspartneroptionPage]
})
export class CustomerspartneroptionPageModule {}
