import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SummaryPageRoutingModule } from './summary-routing.module';

import { SummaryPage } from './summary.page';
import { PageStructureComponent } from '../../components/page-structure/page-structure.component'
import { ListItemComponent } from 'src/app/components/list-item/list-item.component';
import { ListKeyValueComponent } from 'src/app/components/list-key-value/list-key-value.component';
import { MaproutecomponentComponent } from 'src/app/trackorder/maproutecomponent/maproutecomponent.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SummaryPageRoutingModule
  ],
  declarations: [
    SummaryPage,
    PageStructureComponent,
    ListItemComponent,
    ListKeyValueComponent,
    MaproutecomponentComponent
  ]
})
export class SummaryPageModule {}
