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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CharactersPage } from './characters.page';
import { CHARACTERS_ROUTES } from './characters-routes.page';
import { CharacterDetailPage } from './character-detail/character-detail.page';
import { ItemsListComponentModule } from '../../components/items-list/items-list.module';
import { CharacterFormComponent } from './character-form/character-form.component';
import { CommonListHeaderComponentModule } from '../../components/common-list-header/common-list-header.module';
import { DialogModule } from '../../components/dialog/dialog.module';
import { AvatarsListComponentModule } from '../../components/avatars-list/avatars-list.module';
import { MultiAutocompleteFieldComponentModule } from '../../components/multi-autocomplete-field/multi-autocomplete-field.module';

@NgModule({
  declarations: [
    CharactersPage,
    CharacterDetailPage,
    CharacterFormComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatSelectModule,
    AvatarsListComponentModule,
    ItemsListComponentModule,
    CommonListHeaderComponentModule,
    MultiAutocompleteFieldComponentModule,
    DialogModule,
    MatExpansionModule,
    ReactiveFormsModule,
    RouterModule.forChild(CHARACTERS_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: []
})
export class CharactersPageModule { }
