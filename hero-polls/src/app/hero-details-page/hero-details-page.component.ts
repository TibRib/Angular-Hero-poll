import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Perso } from '../perso';
import { PersoService } from '../perso.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'hp-hero-details-page',
  template: `
    <hp-hero-details [personnage]="personnage"></hp-hero-details>
  `,
  styles: [
  ]
})
export class HeroDetailsPageComponent implements OnInit {
  personnage : Perso = null;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private persoService: PersoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id : number = +this.route.snapshot.paramMap.get('id');
      const origin : string = this.route.snapshot.paramMap.get('origin');
      switch(origin){
        case 'Marvel':
        case 'marvel':
          this.persoService.getPersoMARVEL(id).subscribe((r)=> this.personnage=r);
          break;
        
        default:
          console.log("Error :: No origin specified !")
      }
    });
    
    
    
  }

}
