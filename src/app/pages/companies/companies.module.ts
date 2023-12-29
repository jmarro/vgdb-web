import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CompaniesPage } from './companies.page';
import { COMPANIES_ROUTES } from './companies-routes.page';
import { CompanyDetailPage } from './company-detail/company-detail.page';
import { CompaniesService } from '../../services/companies.service';
import { ItemsListComponentModule } from '../../components/items-list/items-list.module';

@NgModule({
  declarations: [
    CompaniesPage,
    CompanyDetailPage
  ],
  imports: [
    CommonModule,
    ItemsListComponentModule,
    RouterModule.forChild(COMPANIES_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [CompaniesService]
})
export class CompaniesPageModule { }
