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

const MOCKUP_DATA = false;

@Injectable({
  providedIn: 'root'
})
export class PersoService {

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
      .set('limit',  String(24))
      .set('offset',  String(page*24));
  }

  getPersosMARVEL(page : number): Array<Perso>{
    let urlGet ="";
    if(MOCKUP_DATA){
      urlGet = "./assets/json_templates/characters.json";
    }else{
      urlGet = MARVEL_URL+"/v1/public/characters";
    }

    const params = this.marvelPageParameters(page);
    let persos : Array<Perso> = [];
     
     this.http.get(urlGet, {params}).subscribe(response =>{
       let data = response["data"];
       let results = data["results"];

       results.forEach(hero => {
        if(hero["description"] || hero["thumbnail"]){
         persos.push(
           this.createPersoWith( hero["id"], hero["name"],hero["description"],[],[],"Marvel",hero["thumbnail"]["path"] +"."+ hero["thumbnail"]["extension"],hero["resourceURI"])
           );
        }
       });
    });

     return persos;
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

}
