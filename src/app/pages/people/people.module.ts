import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CommonListHeaderComponentModule } from '../../components/common-list-header/common-list-header.module';
import { DialogModule } from '../../components/dialog/dialog.module';

import { PeoplePage } from './people.page';
import { PEOPLE_ROUTES } from './people-routes.page';
import { PersonDetailPage } from './person-detail/person-detail.page';
import { ItemsListComponentModule } from '../../components/items-list/items-list.module';
import { AvatarsListComponentModule } from '../../components/avatars-list/avatars-list.module';
import { PeopleService } from '../../services/people.service';
import { PersonFormComponent } from './person-form/person-form.component';


@NgModule({
  declarations: [
    PeoplePage,
    PersonDetailPage,
    PersonFormComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatCheckboxModule,
    CommonListHeaderComponentModule,
    DialogModule,
    ItemsListComponentModule,
    MatExpansionModule,
    AvatarsListComponentModule,
    ReactiveFormsModule,
    RouterModule.forChild(PEOPLE_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [PeopleService]
})
export class PeoplePageModule { }
