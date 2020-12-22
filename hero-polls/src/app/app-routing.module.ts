import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home-page';
import { VersusPageComponent } from './versus-page';
import { AllHeroesPageComponent } from './all-heroes-page';
import { HeroDetailsPageComponent } from './hero-details-page';
import { RefreshComponent } from './refresh/refresh.component';
import { BattlesTablePageComponent } from './battles-table-page';

const routes: Routes = [
  { path : '', component: HomeComponent },
  { path : 'versus', component: VersusPageComponent},
  { path : 'versus/:battleid', component: VersusPageComponent },
  { path : 'battles', component: BattlesTablePageComponent},
  { path: 'heroes', redirectTo: 'heroes/1', pathMatch: 'full' },
  { path : 'heroes/:page', component: AllHeroesPageComponent },
  { path : 'details/:origin/:id', component: HeroDetailsPageComponent },
  { path : 'refresh', component: RefreshComponent},
  

  //Redirection home si non trouvé
  { path : '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
