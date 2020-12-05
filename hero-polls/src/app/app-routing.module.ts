import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home-page';
import { VersusPageComponent } from './versus-page';
import { AllHeroesPageComponent } from './all-heroes-page';
import { HeroDetailsPageComponent } from './hero-details-page';

const routes: Routes = [
  { path : '', component: HomeComponent },
  { path : 'versus', component: VersusPageComponent },
  { path : 'heroes', component: AllHeroesPageComponent },
  { path : 'details/:origin/:id', component: HeroDetailsPageComponent },

  //Redirection home si non trouvé
  { path : '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
