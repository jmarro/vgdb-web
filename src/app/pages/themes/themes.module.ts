import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';

import { ThemesPage } from './themes.page';
import { THEMES_ROUTES } from './themes-routes.page';
import { ThemeDetailPage } from './theme-detail/theme-detail.page';
import { ItemsListComponentModule } from '../../components/items-list/items-list.module';
import { ThemesService } from '../../services/themes.service';

@NgModule({
  declarations: [
    ThemesPage,
    ThemeDetailPage
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatExpansionModule,
    ItemsListComponentModule,
    RouterModule.forChild(THEMES_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ThemesService]
})
export class ThemesPageModule { }
