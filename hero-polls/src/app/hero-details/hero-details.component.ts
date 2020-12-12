import { Component, Input, OnInit } from '@angular/core';
import { Perso } from '../perso';

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
