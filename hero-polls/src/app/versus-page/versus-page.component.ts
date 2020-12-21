import { Component, OnInit } from '@angular/core';
import { Perso } from '../perso';
import { PersoService } from '../perso.service';

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
          <div id="winningBar" class="p-2 d-flex justify-content-between rounded" style="background: linear-gradient(to right, red, blue);">
              <span>Yes</span>
              <span>no</span>
          </div>
        </div>
        <span [ngClass]="{'d-none': madeChoice}" id="vs_label">VS.</span>
      </div>

      <div class="col-5 p-2" id="hero_right">
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
    `
  ]
})
export class VersusPageComponent implements OnInit {
  heroLeft : Perso = null;
  heroRight : Perso = null;
  madeChoice : boolean = false;

  constructor(private persoService: PersoService) { }

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

  choixPersonnage(perso : Perso){
    if (this.madeChoice == true){
      return;
    }

    this.madeChoice = true;
    alert("Merci d'avoir voté pour "+perso.name)
  }

}
