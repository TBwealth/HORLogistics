import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { PageStructureComponent } from '../components/page-structure/page-structure.component';
import { Angular4PaystackModule } from 'angular4-paystack';
import {environment} from '../environment'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule,
    Angular4PaystackModule.forRoot(environment.paystackToken)
  ],
  declarations: [
    OrdersPage,
    PageStructureComponent
  ]

})
export class OrdersPageModule {}
