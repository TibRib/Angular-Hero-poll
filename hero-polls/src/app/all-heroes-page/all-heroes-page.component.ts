import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

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
  constructor(private heroService: PersoService, private route: ActivatedRoute, private location: Location) { 
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
       this.page = +this.route.snapshot.paramMap.get('page');
    });
    this.fetchHeroes();
  }

  fetchHeroes(): void{
    this.heroService.getPersosMARVEL(this.page-1).subscribe((r)=> this.heros=r);
  }

  setPage(value){
    this.page = value;
    console.log("Page updated to "+this.page);
    this.location.replaceState("/heroes/"+value)
    this.fetchHeroes();
  }

}
