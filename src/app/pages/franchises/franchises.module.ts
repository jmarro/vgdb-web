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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';

import { FranchisesPage } from './franchises.page';
import { FRANCHISES_ROUTES } from './franchises-routes.page';
import { FranchiseDetailPage } from './franchise-detail/franchise-detail.page';
import { ItemsListComponentModule } from '../../components/items-list/items-list.module';
import { AvatarsListComponentModule } from '../../components/avatars-list/avatars-list.module';
import { FranchiseFormComponent } from './franchise-form/franchise-form.component';
import { DialogModule } from '../../components/dialog/dialog.module';
import { CommonListHeaderComponentModule } from '../../components/common-list-header/common-list-header.module';
import { MultiAutocompleteFieldComponentModule } from '../../components/multi-autocomplete-field/multi-autocomplete-field.module';
import { SerieFormComponent } from './serie-form/serie-form.component';

@NgModule({
  declarations: [
    FranchisesPage,
    FranchiseDetailPage,
    FranchiseFormComponent,
    SerieFormComponent
  ],
  imports: [
    CommonModule,
    CommonListHeaderComponentModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatMenuModule,
    MatAutocompleteModule,
    ItemsListComponentModule,
    AvatarsListComponentModule,
    MultiAutocompleteFieldComponentModule,
    MatExpansionModule,
    MatListModule,
    DialogModule,
    ReactiveFormsModule,
    RouterModule.forChild(FRANCHISES_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: []
})
export class FranchisesPageModule { }
