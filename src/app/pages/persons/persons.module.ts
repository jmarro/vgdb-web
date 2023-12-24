import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';

import { PersonsPage } from './persons.page';
import { PERSONS_ROUTES } from './persons-routes.page';
import { PersonDetailPage } from './person-detail/person-detail.page';

@NgModule({
  declarations: [
    PersonsPage,
    PersonDetailPage
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    RouterModule.forChild(PERSONS_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: []
})
export class PersonsPageModule { }
