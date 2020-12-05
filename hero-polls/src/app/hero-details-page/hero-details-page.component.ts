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
  ) {
    this.personnage =  {
      id : 0,
      name: "Unknown hero",
      description: "Empty description",
      connections: [],
      abilities : [],
      origin : this.route.snapshot.paramMap.get('origin')+" - "+this.route.snapshot.paramMap.get('id'),
      image : "",
      URI : ""
    };
  }

  ngOnInit(): void {
    //TODO : Async support
    //this.getHero();
  }
  
  getHero(): void {
    const id : number = +this.route.snapshot.paramMap.get('id');
    const origin : string = this.route.snapshot.paramMap.get('origin');
    switch(origin){
      case 'Marvel':
      case 'marvel':
        this.personnage = this.persoService.getPersoMARVEL(id);
        break;
      
      default:
        console.log("Error :: No origin specified !")
    }
    
    
  }

}
