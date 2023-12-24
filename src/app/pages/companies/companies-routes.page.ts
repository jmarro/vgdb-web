import { Routes } from '@angular/router';

import { CompaniesPage } from './companies.page';
import { CompanyDetailPage } from './company-detail/company-detail.page';

export const COMPANIES_ROUTES: Routes = [
    { path: '', component: CompaniesPage },
    { path: ':id', component: CompanyDetailPage }
];
