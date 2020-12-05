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
</div>
  `,
  styles: [
  ]
})
export class AllHeroesPageComponent implements OnInit {
  heros : Array<Perso>
  constructor(private heroService: PersoService) { 
    this.heros = heroService.getPersosMARVEL();
  }

  ngOnInit(): void {
  }

}
