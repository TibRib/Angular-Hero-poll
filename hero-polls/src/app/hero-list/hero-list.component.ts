import { Component, Input, OnInit } from '@angular/core';
import { Perso } from '../perso';
import { PersoService } from '../perso.service';

@Component({
  selector: 'hp-hero-list',
  template: `
    <div class="card-deck">
      <hp-hero-card class="card mb-4" *ngFor="let hero of heros" [personnage]="hero"></hp-hero-card>
    </div>
  `,
    styles: [
      `
      .card{
        min-width: 200px;
      }
      
      `
    ]
})
export class HeroListComponent implements OnInit {
  @Input() heros: Array<Perso>

  constructor() { 
  }
  
  ngOnInit(): void {
  }

}
