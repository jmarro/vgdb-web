import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import {MatGridListModule} from '@angular/material/grid-list';

import { CompaniesPage } from './companies.page';
import { COMPANIES_ROUTES } from './companies-routes.page';
import { CompanyDetailPage } from './company-detail/company-detail.page';
import { CompaniesService } from '../../services/companies.service';

@NgModule({
  declarations: [
    CompaniesPage,
    CompanyDetailPage
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatGridListModule,
    RouterModule.forChild(COMPANIES_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [CompaniesService]
})
export class CompaniesPageModule { }
