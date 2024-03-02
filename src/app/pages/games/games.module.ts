import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';

import { GamesPage } from './games.page';
import { GAMES_ROUTES } from './games-routes.page';
import { GameDetailPage } from './game-detail/game-detail.page';
import { FormsModule } from '@angular/forms';

import { ItemsListComponentModule } from '../../components/items-list/items-list.module';
import { AvatarsListComponentModule } from '../../components/avatars-list/avatars-list.module';

@NgModule({
  declarations: [
    GamesPage,
    GameDetailPage
  ],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatTooltipModule,
    MatExpansionModule,
    MatMenuModule,
    ItemsListComponentModule,
    AvatarsListComponentModule,
    FormsModule,
    RouterModule.forChild(GAMES_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: []
})
export class GamesPageModule { }
