import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';
import { Perso } from './perso';
import { BehaviorSubject, Observable } from 'rxjs';

/* MARVEL API 
  CALLS PER DAY : 3000
  URL : http://gateway.marvel.com
  docs : https://developer.marvel.com/docs
  */

const MARVEL_URL = "/marvel";
const MARVEL_PUB_KEY= "d6e02dd7c891815142fcac32c5c10859";
const MARVEL_PRIV_KEY = "7124daa3a6fc215551ec2e84c5127989333906ef";
const MARVEL_MAX_DATA = 1493; //Id maximal des super héros marvel

const MOCKUP_DATA = false;

@Injectable({
  providedIn: 'root'
})
export class PersoService {
  pageLength : number = 24

  constructor(private http: HttpClient) { 
    if(MOCKUP_DATA)   console.info("%cRunning PersoService in MOCKUP Json mode",
                                    "color: white; font-style: italic; background-color: blue;padding: 2px");
    else              console.info("%cRunning PersoService in Live mode",
                                    "color: black; font-style: italic; background-color: orange;padding: 2px");
  }

  createPerso() : Perso{
    return {
      id : null,
      name: "",
      description: "",
      connections: [],
      abilities : [],
      origin : "",
      image : "",
      URI : ""
    };
  }

  createPersoWith(_id,_name,_description,_connections,_abilities,_origin,_image,_URI) : Perso{
    return {
      id : _id,
      name: _name,
      description: _description,
      connections: _connections,
      abilities : _abilities,
      origin : _origin,
      image : _image,
      URI : _URI
    };
  }

  /* -------- Marvel Related functions ------------ */

  marvelParameters() : HttpParams{
    let ts = String(Date.now());
    return new HttpParams() 
      .set('apikey', MARVEL_PUB_KEY)
      .set('ts', ts)
      .set('hash', String(  Md5.hashStr(ts+MARVEL_PRIV_KEY+MARVEL_PUB_KEY) ))
            //Hash = md5 ( ts+privateKey+publicKey )
  }

  marvelPageParameters(page : number) : HttpParams{
    return this.marvelParameters()
      .set('limit',  String(this.pageLength))
      .set('offset',  String(page*this.pageLength));
  }

  getPersosMARVEL(page : number): Observable<Array<Perso>>{
    let urlGet ="";
    if(MOCKUP_DATA){
      urlGet = "./assets/json_templates/characters.json";
    }else{
      urlGet = MARVEL_URL+"/v1/public/characters";
    }

    const params = this.marvelPageParameters(page);
    let persos :BehaviorSubject<Array<Perso>> = new BehaviorSubject<Array<Perso>>([]);
     
     this.http.get(urlGet, {params}).subscribe(response =>{
       let data = response["data"];
       let results = data["results"];

       let persosRecus: Array<Perso> = []
       results.forEach(hero => {
          persosRecus.push(
           this.createPersoWith( hero["id"], hero["name"],hero["description"],[],[],"Marvel",hero["thumbnail"]["path"] +"."+ hero["thumbnail"]["extension"],hero["resourceURI"])
           );
       });
       persos.next(persosRecus);
    });

     return persos.asObservable();
  }

  getPersoMARVEL(id : number) : Observable<Perso> {
    let urlGet = "";
    if(MOCKUP_DATA){
      urlGet = "./assets/json_templates/character.json";
    }else{
      urlGet = MARVEL_URL+"/v1/public/characters/"+id;
    }

    const params = this.marvelParameters();
    let perso : BehaviorSubject<Perso> = new BehaviorSubject<Perso>(this.createPerso());

    this.http.get(urlGet, { params }).subscribe(response =>{
      let data = response["data"];
      let results = data["results"];
      let hero = results[0];

      perso.next(
        this.createPersoWith( hero["id"], hero["name"],hero["description"],[],[],"Marvel",hero["thumbnail"]["path"] +"."+ hero["thumbnail"]["extension"],hero["resourceURI"])
      );
    });

    return perso.asObservable();
  }

  isExploitable(indiv : Perso){
    return (indiv.description.length>0 && ( indiv.image.length>0 && !indiv.image.endsWith("image_not_available.jpg")) )
  }

  //returns a randomized character that has a valid description and image
  //Will return the first character in list that has
  getRandomPersoMARVEL() : Observable<Perso>{
    let pageLength = this.pageLength;
    let randomOffset = Math.floor(Math.random()*(1493 - this.pageLength));
    let resultingPageFlt = randomOffset/pageLength;
    
    let perso : BehaviorSubject<Perso> = new BehaviorSubject<Perso>(this.createPerso());

    this.getPersosMARVEL(resultingPageFlt).subscribe(persos =>{
      let found = persos.find(indiv => this.isExploitable(indiv));
      perso.next(found);
    });

    return perso.asObservable();
  }

}
