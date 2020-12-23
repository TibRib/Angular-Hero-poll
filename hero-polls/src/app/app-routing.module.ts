import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home-page';
import { VersusPageComponent } from './versus-page';
import { AllHeroesPageComponent } from './all-heroes-page';
import { HeroDetailsPageComponent } from './hero-details-page';
import { RefreshComponent } from './refresh/refresh.component';
import { BattlesTablePageComponent } from './battles-table-page';

const routes: Routes = [
  { path : '', component: HomeComponent }, //Page d'accueil par défaut (HomeComponent)
  { path : 'versus', component: VersusPageComponent}, //Page versus sans paramètre : héros randomisés
  { path : 'versus/:battleid', component: VersusPageComponent }, //Page versus avec un id : rejoindre un combats-sondage non vierge
  { path : 'battles', component: BattlesTablePageComponent},  //Page d'affichage de tous les combats-sondages
  { path: 'heroes', redirectTo: 'heroes/1', pathMatch: 'full' }, //Page d'affichage de tous les héros, redirige vers la page numéro 1
  { path : 'heroes/:page', component: AllHeroesPageComponent },  //Page d'affichage de tous les héros avec numéro de page spécifique
  { path : 'details/:origin/:id', component: HeroDetailsPageComponent }, //Page de détail d'un héro: spécifier origine(pour API ex: 'Marvel' ) et id
  { path : 'refresh', component: RefreshComponent}, //Page vide servant de tampon à la recharge d'une page... (moyen mais fonctionnel)
  

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
