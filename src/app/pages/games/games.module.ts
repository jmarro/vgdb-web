import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';

import { GamesPage } from './games.page';
import { GAMES_ROUTES } from './games-routes.page';
import { GameDetailPage } from './game-detail/game-detail.page';

@NgModule({
  declarations: [
    GamesPage,
    GameDetailPage
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    RouterModule.forChild(GAMES_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: []
})
export class GamesPageModule { }
