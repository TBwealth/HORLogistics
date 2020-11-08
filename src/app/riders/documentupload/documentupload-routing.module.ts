import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentuploadPage } from './documentupload.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentuploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentuploadPageRoutingModule {}
