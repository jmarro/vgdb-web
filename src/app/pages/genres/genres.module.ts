import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';

import { GenresPage } from './genres.page';
import { GENRES_ROUTES } from './genres-routes.page';
import { GenreDetailPage } from './genre-detail/genre-detail.page';
import { ItemsListComponentModule } from '../../components/items-list/items-list.module';
import { GenresService } from '../../services/genres.service';

@NgModule({
  declarations: [
    GenresPage,
    GenreDetailPage
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    ItemsListComponentModule,
    RouterModule.forChild(GENRES_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [GenresService]
})
export class GenresPageModule { }
