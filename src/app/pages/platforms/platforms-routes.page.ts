import { Routes } from '@angular/router';

import { PlatformsPage } from './platforms.page';
import { PlatformDetailPage } from './platform-detail/platform-detail.page';

export const PLATFORMS_ROUTES: Routes = [
    { path: '', component: PlatformsPage },
    { path: ':id', component: PlatformDetailPage }
];
