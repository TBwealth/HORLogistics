import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignedOrdersPageRoutingModule } from './assigned-orders-routing.module';

import { AssignedOrdersPage } from './assigned-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignedOrdersPageRoutingModule
  ],
  declarations: [AssignedOrdersPage]
})
export class AssignedOrdersPageModule {}
