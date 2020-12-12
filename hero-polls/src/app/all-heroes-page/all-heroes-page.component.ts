import { Component, OnInit } from '@angular/core';

import {NgbConfig} from '@ng-bootstrap/ng-bootstrap';
import { Perso } from '../perso';
import { PersoService } from '../perso.service';

@Component({
  selector: 'hp-all-heroes-page',
  template: `
  <div class="container">
    <h1 class="text-center">
      All heroes
    </h1>
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
  constructor(private heroService: PersoService) { 
  }

  ngOnInit(): void {
    this.fetchHeroes();
  }

  fetchHeroes(): void{
    this.heros = this.heroService.getPersosMARVEL(this.page-1);
  }

  setPage(value){
    this.page = value;
    console.log("Page updated to "+this.page);
    this.fetchHeroes();
  }

}
