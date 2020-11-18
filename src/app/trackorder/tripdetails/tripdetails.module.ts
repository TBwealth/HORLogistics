import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripdetailsPageRoutingModule } from './tripdetails-routing.module';

import { TripdetailsPage } from './tripdetails.page';

import {MaproutecomponentComponent} from '../maproutecomponent/maproutecomponent.component';
import { ListKeyValueComponent } from 'src/app/components/list-key-value/list-key-value.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripdetailsPageRoutingModule
  ],
  declarations: [TripdetailsPage,MaproutecomponentComponent, ListKeyValueComponent]
})
export class TripdetailsPageModule {}
