import { Component, Input, OnInit } from '@angular/core';
import { Perso } from '../perso';

@Component({
  selector: 'hp-hero-card',
  template: `
  <!--Card image-->
  <mdb-card-img src="{{personnage.image}}" alt="Card image cap"></mdb-card-img>

  <mdb-card-body>
    <mdb-card-title>
      <h4>{{personnage.name}}</h4>
    </mdb-card-title>

    <mdb-card-text>
      {{personnage.description}}
    </mdb-card-text>

    <a routerLink="/details/{{personnage.origin}}/{{personnage.id}}" mdbBtn color="primary" mdbWavesEffect>Details</a>
  </mdb-card-body>
  `,
  styles: [
  ]
})
export class HeroCardComponent implements OnInit {
  @Input() personnage : Perso;
  constructor() { }

  ngOnInit(): void {
  }

}
