import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';;
import {MatGridListModule} from '@angular/material/grid-list';

import { AvatarsListComponent } from './avatars-list.component';

@NgModule({
  declarations: [
    AvatarsListComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule
  ],
  exports: [
    AvatarsListComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AvatarsListComponentModule { }
