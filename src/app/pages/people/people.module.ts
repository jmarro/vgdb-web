import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';

import { PeoplePage } from './people.page';
import { PEOPLE_ROUTES } from './people-routes.page';
import { PersonDetailPage } from './person-detail/person-detail.page';
import { ItemsListComponentModule } from '../../components/items-list/items-list.module';
import { AvatarsListComponentModule } from '../../components/avatars-list/avatars-list.module';
import { PeopleService } from '../../services/people.service';

@NgModule({
  declarations: [
    PeoplePage,
    PersonDetailPage
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    ItemsListComponentModule,
    MatExpansionModule,
    AvatarsListComponentModule,
    RouterModule.forChild(PEOPLE_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [PeopleService]
})
export class PeoplePageModule { }
