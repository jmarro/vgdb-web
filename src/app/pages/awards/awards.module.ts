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

import { AwardsPage } from './awards.page';
import { AWARDS_ROUTES } from './awards-routes.page';
import { AwardDetailPage } from './award-detail/award-detail.page';
import { ItemsListComponentModule } from '../../components/items-list/items-list.module';
import { AwardsService } from '../../services/awards.service';
import { AwardFormComponent } from './award-form/award-form.component';
import { CategoryFormComponent } from './category-form/category-form.component';

@NgModule({
  declarations: [
    AwardsPage,
    AwardDetailPage,
    AwardFormComponent,
    CategoryFormComponent
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
    ReactiveFormsModule,
    RouterModule.forChild(AWARDS_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [AwardsService]
})
export class AwardsPageModule { }
