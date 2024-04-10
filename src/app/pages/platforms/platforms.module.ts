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
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { PlatformsPage } from './platforms.page';
import { PLATFORMS_ROUTES } from './platforms-routes.page';
import { PlatformDetailPage } from './platform-detail/platform-detail.page';
import { PlatformsService } from '../../services/platforms.service';
import { ItemsListComponentModule } from '../../components/items-list/items-list.module';
import { CommonListHeaderComponentModule } from '../../components/common-list-header/common-list-header.module';
import { DialogModule } from '../../components/dialog/dialog.module';
import { PlatformFormComponent } from './platform-form/platform-form.component';
import { ModelFormComponent } from './model-form/model-form.component';

@NgModule({
  declarations: [
    PlatformsPage,
    PlatformDetailPage,
    PlatformFormComponent,
    ModelFormComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSelectModule,
    MatAutocompleteModule,
    CommonListHeaderComponentModule,
    DialogModule,
    ItemsListComponentModule,
    ReactiveFormsModule,
    RouterModule.forChild(PLATFORMS_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [PlatformsService]
})
export class PlatformsPageModule { }
