import { Component, Input, OnInit } from '@angular/core';
import { Perso } from '../perso';

/* Ce composant est représentatif du contenu associé
 * A la page de détails d'un héros.
 * On y trouvera ainsi
 * - La description
 * - Les aptitudes, s'il y a lieu
 * - Les connexions/Relations = personnage en lien, s'il y a lieu
 * du personnage associé par Input
 * */

@Component({
  selector: 'hp-hero-details',
  templateUrl: 'details_template.html',
  styles: [
  ]
})
export class HeroDetailsComponent implements OnInit {
  @Input() personnage : Perso
  constructor() { }

  ngOnInit(): void {
  }

}
