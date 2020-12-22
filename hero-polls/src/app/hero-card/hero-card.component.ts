import { Component, Input, OnInit } from '@angular/core';
import { Perso } from '../perso';

@Component({
  selector: 'hp-hero-card',
  template: `
  <!--Card image-->
  <mdb-card-img class="image" src="{{personnage.image}}" alt="Card image cap"></mdb-card-img>

  <mdb-card-body *ngIf="personnage.name.length>0">
    <mdb-card-title>
      <h4>{{personnage.name}}</h4>
    </mdb-card-title>

    <a routerLink="/details/{{personnage.origin}}/{{personnage.id}}" mdbBtn color="primary" mdbWavesEffect>Details</a>
  </mdb-card-body>
  `,
  styles: [
    `
      .image{
        object-fit: cover;
        overflow: hidden;
      }
    `
  ]
})
export class HeroCardComponent implements OnInit {
  @Input() personnage : Perso;
  constructor() { }

  ngOnInit(): void {
  }

}
