import { Routes } from '@angular/router';

import { FranchisesPage } from './franchises.page';
import { FranchiseDetailPage } from './franchise-detail/franchise-detail.page';

export const FRANCHISES_ROUTES: Routes = [
    { path: '', component: FranchisesPage },
    { path: ':id', component: FranchiseDetailPage }
];
