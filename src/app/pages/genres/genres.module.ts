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
import { MatCheckboxModule } from '@angular/material/checkbox';

import { GenresPage } from './genres.page';
import { GENRES_ROUTES } from './genres-routes.page';
import { GenreDetailPage } from './genre-detail/genre-detail.page';
import { ItemsListComponentModule } from '../../components/items-list/items-list.module';
import { GenresService } from '../../services/genres.service';
import { CommonListHeaderComponentModule } from '../../components/common-list-header/common-list-header.module';
import { DialogModule } from '../../components/dialog/dialog.module';
import { GenreFormComponent } from './genre-form/genre-form.component';


@NgModule({
  declarations: [
    GenresPage,
    GenreDetailPage,
    GenreFormComponent
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
    MatCheckboxModule,
    CommonListHeaderComponentModule,
    DialogModule,
    ItemsListComponentModule,
    ReactiveFormsModule,
    RouterModule.forChild(GENRES_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [GenresService]
})
export class GenresPageModule { }
