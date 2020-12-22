import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Perso } from '../perso';
import { PersoService } from '../perso.service';
import { Location } from '@angular/common';
import { BattlesService } from '../battles.service';
@Component({
  selector: 'hp-versus-page',
  template: `
    <header class="text-center mb-5">
      <h1>Who would win ?</h1>
    </header>

    <div class="row">
      <div class="col-4 p-2" id="hero_left">
        <hp-hero-votable [perso]="heroLeft" [left]="true"  (choisiEvent)="choixPersonnage($event)"></hp-hero-votable>
      </div>

      <div class="col align-self-center text-center">
        <div [ngClass]="{'d-none': !madeChoice}" id="vs_bar">
          <div id="winningBar" class="p-2 d-flex justify-content-between rounded">
              <span>{{prctLeft}}%</span>
              <span>{{prctRight}}%</span>
          </div>
          <p>{{nbVoters}} votes</p>
          <div class="container mt-auto">
            <button (click)="refresh()" class="btn btn-block btn-warning mb-2">Another versus</button>
            <a routerLink="/heroes" class="btn btn-block btn-secondary">All heroes</a>
          </div>
        </div>
        <span [ngClass]="{'d-none': madeChoice}" id="vs_label">VS.</span>
      </div>

      <div class="col-4 p-2" id="hero_right">
        <hp-hero-votable [perso]="heroRight" [left]="false" (choisiEvent)="choixPersonnage($event)"></hp-hero-votable>
      </div>
      
    </div>

  `,
  styles: [
    `
    #vs_label{
      font-size: 3em;
      font-weight : bold;
    }

    #winningBar{
      color : white;
      font-weight: bold;
      background:linear-gradient(to right, red 0%, blue 100%);
    }
    `
  ]
})
export class VersusPageComponent implements OnInit {
  heroLeft : Perso = null;
  heroRight : Perso = null;
  madeChoice : boolean = false;
  prctLeft :number; prctRight : number;
  nbVoters : number = 1;

  @Output() close = new EventEmitter();

  constructor(private persoService: PersoService,
              private battles : BattlesService,
              private router: Router,
              private location: Location)
              { }

  ngOnInit(): void {
    this.heroLeft = this.persoService.createPerso();
    this.heroRight = this.persoService.createPerso();

    this.persoService.getRandomPersoMARVEL().subscribe( r => {
      this.heroLeft = r;
    });
    this.persoService.getRandomPersoMARVEL().subscribe( r => {
      this.heroRight = r;
    });
  }

  /* 
    Méthode qui valide le choix d'un personnage :
    1 : Enregistre le vote en base / incrémente si existant
    2 : Met à jour les valeurs associées aux résultats
    3 : Autorise l'affichage des résultats
  */
  choixPersonnage(perso : Perso): void{
    //On vérifie que le vote n'a pas déjà été fait sur la page:
    if (this.madeChoice == true){
      return;
    }
    //On récupère, si existant le combat en question
    this.battles.getBattleBetween(this.heroLeft,this.heroRight).subscribe(
      battle => {
        //Log the result
        console.log(battle);

        //1 : Enregistre le vote en base / incrémente si existant
        if(battle === null){ //Combat non éxistant entre ces deux personnages
          //On enregistre un nouveau combat en base

          //On incrémente la valeur de perso

          //2 : Met à jour les valeurs associées aux résultats
          //check perso: -- Placeholder
          if(perso.id === this.heroLeft.id){
            this.prctLeft = 100;
            this.prctRight = 0;
          }
          else{
            this.prctRight = 100;
            this.prctLeft = 0;
          }
        }
        else{
          //Incrément de la valeur en base

          //2 : Met à jour les valeurs associées aux résultats
          this.prctLeft = 32;
          this.prctRight = 100-this.prctLeft;
        }

        //3 : Autorise l'affichage des résultats, confirme le vote:
        this.madeChoice = true;
      });
  }

  refresh(){
    //Pas très joli, mais workaround pour rafraichir la page
    this.router.navigateByUrl("/refresh",{skipLocationChange:true}).then(() => {
      let uri = decodeURI(this.location.path());
      this.router.navigate([uri]);
    });
  }

}
