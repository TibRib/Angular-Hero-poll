import { Component, Input, OnInit } from '@angular/core';
import { Perso } from '../perso';
import { PersoService } from '../perso.service';

@Component({
  selector: 'hp-hero-list',
  template: `

    <div class="card-deck" *ngIf="!heros">
      <hp-ghost-card class="card mb-4" *ngFor="let i of [0,1,2,3,4,5,6,7,8,9,10,11]"></hp-ghost-card>
    </div>
    <div class="card-deck" *ngIf="heros">
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
