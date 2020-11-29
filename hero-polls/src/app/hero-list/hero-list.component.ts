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
      <hp-hero-card *ngFor="let hero of heros"></hp-hero-card>
    </div>
  `,
  styles: [
  ]
})
export class HeroListComponent implements OnInit {
  count : number = 3;
  heros : Array<Perso>

  constructor(private heroService: PersoService) { 
    this.heros = [];
    for(let i =0; i<this.count; i++){
      this.heros.push(
        {  id : i, name: "", description: "", backstory: "", connections: [], abilities : [], origin : "" }
      );
    }
  }
  
  ngOnInit(): void {
  }

}
