import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Perso } from '../perso';
import { PersoService } from '../perso.service';
import { Observable } from 'rxjs';

/* Ce composant représente la page
 * Qui va détenir le contenu du composant details
 * Et transmettre les données d'Input à celui-ci */

@Component({
  selector: 'hp-hero-details-page',
  template: `
    <hp-hero-details [personnage]="personnage"></hp-hero-details>
  `,
  styles: [
  ]
})
export class HeroDetailsPageComponent implements OnInit {
  personnage : Perso;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private persoService: PersoService
  ) {}

  ngOnInit(): void {
    //Au lancement, on vérifie que les informations sont fournies
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id_parameter = this.route.snapshot.paramMap.get('id');
      const id : number = +id_parameter; //Récupération de l'id du héros
      const origin : string = this.route.snapshot.paramMap.get('origin'); //Récupération de l'origine du héros

      /* Pour rappel, le projet a pour intention d'avoir la possibilité de faire des appels vers d'autres API :
        - DC Comics, Pop culture, personnages de films....
        J'ai ainsi ajouté ce traitement lié à l'origine dans l'optique d'une récupération différente selon les API d'origine */
      switch(origin){
        case 'Marvel':
        case 'marvel':
          //Origine marvel:
          if(id_parameter == "random"){ //Si l'id indiquée est la chaine "random", cela est supporté et on affiche un personnage aléatoire! 
            console.log("detected random id ! fetching...");
            this.persoService.getRandomPersoMARVEL()
              .subscribe( r =>{
                 this.personnage=r;
                 console.log(r)
                });
          }else{ //Si dans le cas classique, un id est entré, on affiche le personnage associé
            this.persoService.getPersoMARVEL(id,true).subscribe((r)=> this.personnage=r);
             //Le paramètre true ici indiqué signifie que l'on souhaite aussi récupérer les relations du personnage.
          }
          break;
        
        default:
          console.log("Error :: No origin specified !")
      }
      //Petit hack qui permet de s'assurer que l'on reste en haut de l'écran lorsque tout le contenu est chargé
      window.scrollTo(0, 0);
    });
    
    
    
  }

}
