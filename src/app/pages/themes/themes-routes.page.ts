import { Routes } from '@angular/router';

import { ThemesPage } from './themes.page';
import { ThemeDetailPage } from './theme-detail/theme-detail.page';

export const THEMES_ROUTES: Routes = [
    { path: '', component: ThemesPage },
    { path: ':id', component: ThemeDetailPage }
];
