import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Perso } from '../perso';
import { PersoService } from '../perso.service';
import { Location } from '@angular/common';
import { BattlesService } from '../battles.service';
import { Participant } from '../participant';
import { Battle } from '../battle';
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
            <button (click)="refresh()" mdbBtn class="btn-warning mb-2 btn-block">Another versus</button>
            <a routerLink="/heroes" mdbBtn class="btn-light btn-block" data-mdb-ripple-color="dark">All heroes</a>
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
              private route: ActivatedRoute,
              private location: Location)
              { }

  ngOnInit(): void { //On donne la possibilité de charger une battle déjà enregistrée par id
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id_parameter = this.route.snapshot.paramMap.get('battleid');
      if(id_parameter == null){
        //Classic way : init the polling with two randoms
        this.initAndRandomizePoll();
      }
      else{
        const id : number = +id_parameter;
        this.loadBattle(id);
      }
    });
  }

  initAndRandomizePoll() : void {
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
    /*
    if (this.madeChoice == true){
      return;
    }
    */
    //On récupère, si existant le combat en question
    this.battles.getBattleBetween(this.heroLeft,this.heroRight).subscribe(
      battle => {
        //Log the result
        console.log(battle);

        //1 : Enregistre le vote en base / incrémente si existant
        if(battle === null){ //Combat non éxistant entre ces deux personnages
          //On incrémente la valeur de perso
          this.nbVoters = 1;
          let voteLeft : number = 0;
          let voteRight : number = 0;
          if(perso.id === this.heroLeft.id){
            voteLeft = 1;
          }else{
            voteRight = 1;
          }
          let participants : Array<Participant> = [ 
            this.battles.newParticipant(this.heroLeft, voteLeft),
            this.battles.newParticipant(this.heroRight, voteRight),
          ]
          //On enregistre un nouveau combat en base
          console.log("Battle non existante, enregistrement en base !")
          let newBattle: Battle = 
            {
              'id': Math.floor(Math.random() * Math.floor(9999999)),
              'participants' : participants,
              'name' : this.heroLeft.name+" vs. "+this.heroRight.name,
            };
          this.battles.addBattle( newBattle );
          console.log("Battle "+newBattle.id+" sauvée : "+newBattle.name);

          //2 : Met à jour les valeurs associées aux résultats
          //check perso: -- Placeholder
          if(perso.id === this.heroLeft.id){
            this.prctLeft = voteLeft*100;
            this.prctRight = voteRight*100;
          }
        }
        //Battle existante !
        else{
          let newBattle = battle;
          console.log("Battle "+newBattle.id+" existante en base : "+newBattle.name);
          //Incrément de la valeur du vote
          if(newBattle.participants[0].id === perso.id)
            newBattle.participants[0].votes += 1;
          else if(newBattle.participants[1].id === perso.id)
            newBattle.participants[1].votes += 1;

          //Envoi de la nouvelle donnée en base
          this.battles.updateBattle(newBattle)
          //2 : Met à jour les valeurs associées aux résultats
          const votesL = newBattle.participants[0].votes;
          const votesR = newBattle.participants[1].votes;
          const somme = votesL + votesR;
          this.nbVoters = somme;
          this.prctLeft = Math.floor((votesL/somme) * 100) ;
          this.prctRight = Math.floor((votesR/somme) * 100);
        }

        //3 : Autorise l'affichage des résultats, confirme le vote:
        this.madeChoice = true;
      });
  }

  refresh(){
    //Pas très joli, mais workaround pour rafraichir la page
    this.router.navigateByUrl("/refresh",{skipLocationChange:true}).then(() => {
      let uri = decodeURI(this.location.path());
      this.router.navigate(['/versus']);
    });
  }

  //On charge une battle déja enregistrée : 
  loadBattle(battleid: number){
    console.log("Loading battle n°"+battleid);
    this.battles.getBattleById(battleid).subscribe( battle => {
      this.persoService.getPersoMARVEL(battle.participants[0].id, false).subscribe( r => {
        this.heroLeft = r;
      });
      this.persoService.getPersoMARVEL(battle.participants[1].id, false).subscribe( r => {
        this.heroRight = r;
      });

    });
    
  }

}
