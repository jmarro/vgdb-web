import { Routes } from '@angular/router';

import { CharactersPage } from './characters.page';
import { CharacterDetailPage } from './character-detail/character-detail.page';

export const CHARACTERS_ROUTES: Routes = [
    { path: '', component: CharactersPage },
    { path: ':id', component: CharacterDetailPage }
];
