import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';

import { FranchisesPage } from './franchises.page';
import { FRANCHISES_ROUTES } from './franchises-routes.page';
import { FranchiseDetailPage } from './franchise-detail/franchise-detail.page';
import { ItemsListComponentModule } from '../../components/items-list/items-list.module';

@NgModule({
  declarations: [
    FranchisesPage,
    FranchiseDetailPage
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    ItemsListComponentModule,
    RouterModule.forChild(FRANCHISES_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: []
})
export class FranchisesPageModule { }
