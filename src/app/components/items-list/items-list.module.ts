import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';;
import {MatGridListModule} from '@angular/material/grid-list';

import { ItemsListComponent } from './items-list.component';

@NgModule({
  declarations: [
    ItemsListComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule
  ],
  exports: [
    ItemsListComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ItemsListComponentModule { }
