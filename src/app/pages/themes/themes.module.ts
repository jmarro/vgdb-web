import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';

import { ThemesPage } from './themes.page';
import { THEMES_ROUTES } from './themes-routes.page';
import { ThemeDetailPage } from './theme-detail/theme-detail.page';
import { ItemsListComponentModule } from '../../components/items-list/items-list.module';
import { ThemesService } from '../../services/themes.service';
import { CommonListHeaderComponentModule } from '../../components/common-list-header/common-list-header.module';
import { DialogModule } from '../../components/dialog/dialog.module';
import { ThemeFormComponent } from './theme-form/theme-form.component';


@NgModule({
  declarations: [
    ThemesPage,
    ThemeDetailPage,
    ThemeFormComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    CommonListHeaderComponentModule,
    DialogModule,
    ItemsListComponentModule,
    ReactiveFormsModule,
    RouterModule.forChild(THEMES_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ThemesService]
})
export class ThemesPageModule { }
