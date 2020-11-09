import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignedorderdetailsPageRoutingModule } from './assignedorderdetails-routing.module';

import { AssignedorderdetailsPage } from './assignedorderdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignedorderdetailsPageRoutingModule
  ],
  declarations: [AssignedorderdetailsPage]
})
export class AssignedorderdetailsPageModule {}
