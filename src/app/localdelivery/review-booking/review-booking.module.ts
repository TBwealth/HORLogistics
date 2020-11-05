import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PageStructureComponent } from '../../components/page-structure/page-structure.component'

import { ReviewBookingPageRoutingModule } from './review-booking-routing.module';

import { ReviewBookingPage } from './review-booking.page';
import { ListItemComponent } from 'src/app/components/list-item/list-item.component';
import { ListKeyValueComponent } from 'src/app/components/list-key-value/list-key-value.component';
import { MaproutecomponentComponent } from 'src/app/trackorder/maproutecomponent/maproutecomponent.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewBookingPageRoutingModule,
  ],
  declarations: [
    ReviewBookingPage, 
    PageStructureComponent,
    ListItemComponent,
    ListKeyValueComponent,
    MaproutecomponentComponent
  ],
  entryComponents: []
})
export class ReviewBookingPageModule {}
