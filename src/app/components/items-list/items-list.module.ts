import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator';

import { ItemsListComponent } from './items-list.component';

@NgModule({
  declarations: [
    ItemsListComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatPaginatorModule
  ],
  exports: [
    ItemsListComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ItemsListComponentModule { }
