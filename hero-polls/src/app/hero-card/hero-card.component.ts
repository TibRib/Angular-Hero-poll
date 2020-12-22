import { Component, Input, OnInit } from '@angular/core';
import { Perso } from '../perso';

/* Ce component sert à afficher une image, un nom et un bouton 
 * Représentant le héros au sein d'une liste
 * Au format d'une carte Bootstrap */

@Component({
  selector: 'hp-hero-card',
  template: `
  <!--Card image-->
  <mdb-card-img class="image" src="{{personnage.image}}" alt="Card image cap"></mdb-card-img>

  <!-- On affiche le nom du personnage que s'il est entré -->
  <mdb-card-body *ngIf="personnage.name.length>0">
    <mdb-card-title>
      <h4>{{personnage.name}}</h4>
    </mdb-card-title>

    <!-- Bouton vers la page de détails associée au personnage -->
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
  @Input() personnage : Perso; //On demande un Personnage en entrée
  constructor() { }

  ngOnInit(): void {
  }

}
