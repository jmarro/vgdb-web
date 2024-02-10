import { Routes } from '@angular/router';

import { AwardsPage } from './awards.page';
import { AwardDetailPage } from './award-detail/award-detail.page';

export const AWARDS_ROUTES: Routes = [
    { path: '', component: AwardsPage },
    { path: ':id', component: AwardDetailPage }
];
