import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import {NgbConfig} from '@ng-bootstrap/ng-bootstrap';
import { Perso } from '../perso';
import { PersoService } from '../perso.service';

/* Ce composant a pour objectif
 * de fournir un système de navigation
 * et des données associées à une liste de personnages,
 * passées vers un hero-list component */

@Component({
  selector: 'hp-all-heroes-page',
  template: `
  <div class="container">
    <h1 class="text-center">
      All heroes
    </h1>
    <div class="mx-auto text-center">
      <button type="button" (click)="setPage(page-1)" *ngIf="(page-1)>0" class="btn btn-primary"><{{page-1}}</button>
      <button type="button" class="btn btn-info" disabled>{{page}}</button>
      <button type="button" (click)="setPage(page+1)" class="btn btn-primary">{{page+1}}></button>
    </div>
  <hr>
    
    <hp-hero-list [heros]="heros"></hp-hero-list>
    
    <div class="mx-auto text-center">
      <button type="button" (click)="setPage(page-1)" *ngIf="(page-1)>0" class="btn btn-primary"><{{page-1}}</button>
      <button type="button" class="btn btn-info" disabled>{{page}}</button>
      <button type="button" (click)="setPage(page+1)" class="btn btn-primary">{{page+1}}></button>
    </div>
</div>
  `,
  styles: [
  ]
})
export class AllHeroesPageComponent implements OnInit {
  heros : Array<Perso>
  page : number = 1;
  constructor(private heroService: PersoService, private route: ActivatedRoute, private location: Location) { 
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
       this.page = +this.route.snapshot.paramMap.get('page');
       if(this.page < 1){
         //On borne le numéro de page à minimum 1.
        this.setPage(1);
       }
    });
    //On déclenche l'appel du contenu
    this.fetchHeroes();
  }

  /* Méthode de récupération des héros à afficher, pour la page X décalée sur l'intervalle [0:n] au lieu de [1:n+1] */
  fetchHeroes(): void{
    //Récupération asynchrone de la liste des héros à afficher
    this.heroService.getPersosMARVEL(this.page-1).subscribe((r)=> this.heros=r);
  }

  /* Change la page ( ex: /5 ) dans le routing et actualise le contenu */
  setPage(value){
    this.page = value;
    console.log("Page updated to "+this.page);
    this.location.replaceState("/heroes/"+value)
    this.fetchHeroes();
  }

}
