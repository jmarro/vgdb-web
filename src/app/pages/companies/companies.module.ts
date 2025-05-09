import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

import { CommonListHeaderComponentModule } from '../../components/common-list-header/common-list-header.module';
import { DialogModule } from '../../components/dialog/dialog.module';
import { ItemsListComponentModule } from '../../components/items-list/items-list.module';

import { CompaniesPage } from './companies.page';
import { COMPANIES_ROUTES } from './companies-routes.page';
import { CompanyDetailPage } from './company-detail/company-detail.page';
import { CompaniesService } from '../../services/companies.service';
import { CompanyFormComponent } from './company-form/company-form.component';
import { MultiAutocompleteFieldComponentModule } from '../../components/multi-autocomplete-field/multi-autocomplete-field.module';

@NgModule({
  declarations: [
    CompaniesPage,
    CompanyFormComponent,
    CompanyDetailPage
  ],
  imports: [
    CommonModule,
    DialogModule,
    ItemsListComponentModule,
    CommonListHeaderComponentModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule, 
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MultiAutocompleteFieldComponentModule,
    ReactiveFormsModule,
    RouterModule.forChild(COMPANIES_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    CompaniesService
  ]
})
export class CompaniesPageModule { }
