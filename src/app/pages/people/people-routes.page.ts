import { Routes } from '@angular/router';

import { PeoplePage } from './people.page';
import { PersonDetailPage } from './person-detail/person-detail.page';

export const PEOPLE_ROUTES: Routes = [
    { path: '', component: PeoplePage },
    { path: ':id', component: PersonDetailPage }
];
