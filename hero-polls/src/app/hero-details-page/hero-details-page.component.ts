import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Perso } from '../perso';
import { PersoService } from '../perso.service';

@Component({
  selector: 'hp-hero-details-page',
  templateUrl: './details_template.html',
  styles: [
  ]
})
export class HeroDetailsPageComponent implements OnInit {
  personnage : Perso;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private persoService: PersoService
  ) { }

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.personnage = this.persoService.getPersoMARVEL(id);
  }

}
