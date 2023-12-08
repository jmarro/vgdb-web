import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { HOME_ROUTES } from './home-routes.page';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HOME_ROUTES)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: []
})
export class HomePageModule { }
