import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { VersusPageComponent } from './versus-page/versus-page.component';
import { AllHeroesPageComponent } from './all-heroes-page/all-heroes-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroCardComponent,
    HeroListComponent,
    VersusPageComponent,
    AllHeroesPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
