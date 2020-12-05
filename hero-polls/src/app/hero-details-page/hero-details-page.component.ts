import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Perso } from '../perso';

@Component({
  selector: 'hp-hero-details-page',
  templateUrl: './details_template.html',
  styles: [
  ]
})
export class HeroDetailsPageComponent implements OnInit {
  @Input() personnage : Perso;
  constructor() { }

  ngOnInit(): void {
  }

}
