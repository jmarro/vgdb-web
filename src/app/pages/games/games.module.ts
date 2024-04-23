import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { GamesPage } from './games.page';
import { GAMES_ROUTES } from './games-routes.page';
import { GameDetailPage } from './game-detail/game-detail.page';


import { ItemsListComponentModule } from '../../components/items-list/items-list.module';
import { AvatarsListComponentModule } from '../../components/avatars-list/avatars-list.module';
import { CommonListHeaderComponentModule } from '../../components/common-list-header/common-list-header.module';
import { MultiAutocompleteFieldComponentModule } from '../../components/multi-autocomplete-field/multi-autocomplete-field.module';
import { DialogModule } from '../../components/dialog/dialog.module';
import { SafePipe } from 'safe-pipe';
import { GameFormComponent } from './game-form/game-form.component';
import { GameAwardFormComponent } from './game-award-form/game-award-form.component';

@NgModule({
  declarations: [
    GamesPage,
    GameDetailPage,
    GameFormComponent,
    GameAwardFormComponent
  ],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    MatMenuModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    CommonListHeaderComponentModule,
    ItemsListComponentModule,
    AvatarsListComponentModule,
    MultiAutocompleteFieldComponentModule,
    DialogModule,
    FormsModule,
    SafePipe,
    ReactiveFormsModule,
    RouterModule.forChild(GAMES_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: []
})
export class GamesPageModule { }
