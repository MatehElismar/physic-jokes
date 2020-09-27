import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsertDataPage } from './insert-data.page';

const routes: Routes = [
  {
    path: '',
    component: InsertDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsertDataPageRoutingModule {}
