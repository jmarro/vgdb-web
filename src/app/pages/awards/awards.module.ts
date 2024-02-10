import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';

import { AwardsPage } from './awards.page';
import { AWARDS_ROUTES } from './awards-routes.page';
import { AwardDetailPage } from './award-detail/award-detail.page';
import { ItemsListComponentModule } from '../../components/items-list/items-list.module';
import { AwardsService } from '../../services/awards.service';

@NgModule({
  declarations: [
    AwardsPage,
    AwardDetailPage
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    ItemsListComponentModule,
    RouterModule.forChild(AWARDS_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [AwardsService]
})
export class AwardsPageModule { }
