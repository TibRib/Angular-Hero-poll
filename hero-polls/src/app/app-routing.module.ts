import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { VersusPageComponent } from './versus-page';
import { AllHeroesPageComponent } from './all-heroes-page';

const routes: Routes = [
  { path : '', component: HomeComponent },
  { path : 'versus', component: VersusPageComponent },
  { path : 'heroes', component: AllHeroesPageComponent },

  //Redirection home si non trouvé
  { path : '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
