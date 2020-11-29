import { Component, OnInit } from '@angular/core';
import { Perso } from '../perso';
import { PersoService } from '../perso.service';

@Component({
  selector: 'hp-hero-list',
  template: `
    <p>
      hero-list works!
    </p>
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
  count : number = 8;
  heros : Array<Perso>

  constructor(private heroService: PersoService) { 
    this.heros = [];
    for(let i =0; i<this.count; i++){
      this.heros.push(
        {  id : i, name: "Name", description: "description", backstory: "backstory", connections: [], abilities : [], origin : "DC", image : "https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(97).jpg" }
      );
    }
  }
  
  ngOnInit(): void {
  }

}
