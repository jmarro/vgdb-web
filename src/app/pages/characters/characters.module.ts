import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';

import { CharactersPage } from './characters.page';
import { CHARACTERS_ROUTES } from './characters-routes.page';
import { CharacterDetailPage } from './character-detail/character-detail.page';
import { ItemsListComponentModule } from '../../components/items-list/items-list.module';

@NgModule({
  declarations: [
    CharactersPage,
    CharacterDetailPage
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    ItemsListComponentModule,
    RouterModule.forChild(CHARACTERS_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: []
})
export class CharactersPageModule { }
