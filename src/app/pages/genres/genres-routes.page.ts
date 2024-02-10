import { Routes } from '@angular/router';

import { GenresPage } from './genres.page';
import { GenreDetailPage } from './genre-detail/genre-detail.page';

export const GENRES_ROUTES: Routes = [
    { path: '', component: GenresPage },
    { path: ':id', component: GenreDetailPage }
];
