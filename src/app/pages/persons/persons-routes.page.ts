import { Routes } from '@angular/router';

import { PersonsPage } from './persons.page';
import { PersonDetailPage } from './person-detail/person-detail.page';

export const PERSONS_ROUTES: Routes = [
    { path: '', component: PersonsPage },
    { path: ':id', component: PersonDetailPage }
];
