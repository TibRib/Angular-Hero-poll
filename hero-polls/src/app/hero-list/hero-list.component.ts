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
      <hp-hero-card *ngFor="let i of heros"></hp-hero-card>
    </div>
  `,
  styles: [
  ]
})
export class HeroListComponent implements OnInit {
  count : number = 20;
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
