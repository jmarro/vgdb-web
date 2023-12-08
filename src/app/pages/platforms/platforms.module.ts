import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';

import { PlatformsPage } from './platforms.page';
import { PLATFORMS_ROUTES } from './platforms-routes.page';
import { PlatformDetailPage } from './platform-detail/platform-detail.page';

@NgModule({
  declarations: [
    PlatformsPage,
    PlatformDetailPage
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    RouterModule.forChild(PLATFORMS_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: []
})
export class PlatformsPageModule { }
