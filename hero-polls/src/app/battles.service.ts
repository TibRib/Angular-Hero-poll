import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Perso } from './perso';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Battle } from './battle';
import { Participant } from './participant';

/* Battle services : 
 * En française: combats-sondages
 * Code commenté en anglais, if you don't mind
 * 
 * Prodigue toutes les fonctions associées 
 * Aux GET et PUT des sondages dans l'API locale
 * stockée sur le json-server.
 */

const BATTLES_URL = "/localapi/battles";

@Injectable({
  providedIn: 'root'
})
export class BattlesService {

  constructor(private http: HttpClient) { }

  //Returns all of the battles saved in the local json server
  getBattles() : Observable<Array<Battle>>{
    let battles :Subject<Array<Battle>> = new Subject<Array<Battle>>();

     //Launch the subscription of the http GET
     this.http.get<Array<Battle>>(BATTLES_URL).subscribe(response =>{
      battles.next(response);
    });

     return battles.asObservable();
  }

  //Returns a battle by its Id
  getBattleById(id:number) : Observable<Battle>{
    let battle : Subject<Battle> = new Subject<Battle>();
    this.getBattles().subscribe( all =>{
      let found = all.find(battle => battle["id"] === id )
      if(found){
        battle.next(found);
      }
    })
    return battle.asObservable();
  }

  //Self explainatory : Returns The battle that correspond to a name
  //                                      Ex: "batman vs. superman"
  //Non utilisée (dépréciée) mais gardée si besoin..
  getBattleByTitle(title:String) : Observable<Battle>{
    let battle : Subject<Battle> = new Subject<Battle>();
    this.getBattles().subscribe( all =>{
      let found = all.find(battle => battle["name"] === title )
      if(found){
        battle.next(found);
      }
    })
    return battle.asObservable();
  }

  //Returns true if one of the provided battle's participants corresponds to the name
  hasHero(battle: Battle, id : number){
    for (let i = 0; i < battle.participants.length; i++) {
      if( battle.participants[i].id === id ){
        return true;
      }
    }
    //Aucun correspondant - retour false
    return false;
  }

  //Returns a list of all the battles the provided hero was involved in.
  getBattlesOfHero(perso:Perso) : Observable<Array<Battle>> {
    let battles :Subject<Array<Battle>> = new Subject<Array<Battle>>();
    
    this.getBattles().subscribe(all =>{
      console.log("all battles:");
      console.log(all)
      battles.next( all.filter(battle => this.hasHero(battle, perso.id)) )
    });

    return battles.asObservable();
  }

  //Returns a battle, if found, between two provided heroes
  getBattleBetween(perso1 : Perso, perso2: Perso) : Observable<Battle>{
    let battle : Subject<Battle> = new Subject<Battle>();
    //First I query all of the battles that feature the first hero
    this.getBattlesOfHero(perso1).subscribe(all =>{
      console.log("battles of "+perso1.name);
      console.log(all)
      let foundSomething = false;
      //Then I iterate between these to check if its opponent is the one targetted
      for (let i = 0; i < all.length; i++) {
        if( this.hasHero(all[i], perso2.id) )
          foundSomething = true;
          battle.next(all[i]); //If it's the case, I set it as the next value.
          break;              // And exit the check loop.
      }
      if( foundSomething === false){
        battle.next(null);
      }
      console.log("here")
    });
    return battle.asObservable();
  }

  //Puts a new battle into the database
  addBattle(battle : Battle) {
    this.http.post(BATTLES_URL, battle).subscribe(data => {
      console.log(data);
    });
  }

  //Change the battle with a specific id in the database
  updateBattle(battle : Battle){
    this.http.put(BATTLES_URL+"/"+battle.id, battle).subscribe(data => {
      console.log(data);
    });
  }

  //Converts a Personnage into a simplified Participant object
  newParticipant(perso: Perso, votes:number=0) : Participant{
    return {
      'id' : perso.id,
      'name' : perso.name,
      'uri' : perso.URI,
      'votes' : votes
    }
  }

}
