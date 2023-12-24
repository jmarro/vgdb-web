import { Routes } from '@angular/router';

import { GamesPage } from './games.page';
import { GameDetailPage } from './game-detail/game-detail.page';

export const GAMES_ROUTES: Routes = [
    { path: '', component: GamesPage },
    { path: ':id', component: GameDetailPage }
];
