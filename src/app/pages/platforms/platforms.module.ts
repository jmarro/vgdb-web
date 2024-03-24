import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';

import { PlatformsPage } from './platforms.page';
import { PLATFORMS_ROUTES } from './platforms-routes.page';
import { PlatformDetailPage } from './platform-detail/platform-detail.page';
import { PlatformsService } from '../../services/platforms.service';
import { ItemsListComponentModule } from '../../components/items-list/items-list.module';

@NgModule({
  declarations: [
    PlatformsPage,
    PlatformDetailPage
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatExpansionModule,
    ItemsListComponentModule,
    RouterModule.forChild(PLATFORMS_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [PlatformsService]
})
export class PlatformsPageModule { }
