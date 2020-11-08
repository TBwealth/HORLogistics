import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentuploadPageRoutingModule } from './documentupload-routing.module';

import { DocumentuploadPage } from './documentupload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentuploadPageRoutingModule
  ],
  declarations: [DocumentuploadPage]
})
export class DocumentuploadPageModule {}
