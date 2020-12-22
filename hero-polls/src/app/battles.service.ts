import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Perso } from './perso';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Battle } from './battle';

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
  // Ex: "batman vs. superman"
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
    for (let i = 0; i < battle.heros.length; i++) {
      if( battle.heros[i].id === id ){
        return true;
      }
    }
    //Aucun correspondant - retour false
    return false;
  }

  //Returns a list of all the battles the provided hero was involved in.
  getBattlesOfHero(perso:Perso) : Observable<Array<Battle>> {
    let heroName = perso.name;
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
          battle.next(all[i]); //If it's the case, I set it as the next value.
          foundSomething = true;
          break;              // And exit the check loop.
      }
      if( !foundSomething ){
        battle.next(null);
      }
    });
    return battle.asObservable();
  }

}
