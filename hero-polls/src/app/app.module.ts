import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { VersusPageComponent } from './versus-page';
import { AllHeroesPageComponent } from './all-heroes-page';
import { HomeComponent } from './home-page';
import { HeroDetailsPageComponent } from './hero-details-page';
import { BattlesTablePageComponent } from './battles-table-page';

import { HttpClientModule } from '@angular/common/http';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { HeroVotableComponent } from './hero-votable/hero-votable.component';
import { RefreshComponent } from './refresh/refresh.component';
import { GhostCardComponent } from './ghost-card/ghost-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroCardComponent,
    HeroListComponent,
    VersusPageComponent,
    AllHeroesPageComponent,
    HomeComponent,
    HeroDetailsPageComponent,
    HeroDetailsComponent,
    HeroVotableComponent,
    RefreshComponent,
    GhostCardComponent,
    BattlesTablePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
