import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    path: 'home'
  },
  {
    loadChildren: () => import('./pages/games/games.module').then( m => m.GamesPageModule),
    path: 'games'
  },
  {
    loadChildren: () => import('./pages/franchises/franchises.module').then( m => m.FranchisesPageModule),
    path: 'franchises'
  },
  {
    loadChildren: () => import('./pages/characters/characters.module').then( m => m.CharactersPageModule),
    path: 'characters'
  },
  {
    loadChildren: () => import('./pages/companies/companies.module').then( m => m.CompaniesPageModule),
    path: 'companies'
  },
  {
    loadChildren: () => import('./pages/platforms/platforms.module').then( m => m.PlatformsPageModule),
    path: 'platforms'
  },
  {
    loadChildren: () => import('./pages/persons/persons.module').then( m => m.PersonsPageModule),
    path: 'persons'
  },
  {path: '', redirectTo: 'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
