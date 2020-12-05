import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';
import { Perso } from './perso';

/* MARVEL API 
  CALLS PER DAY : 3000
  URL : http://gateway.marvel.com
  docs : https://developer.marvel.com/docs
  */

const MARVEL_URL = "marvel";
const MARVEL_PUB_KEY= "d6e02dd7c891815142fcac32c5c10859";
const MARVEL_PRIV_KEY = "7124daa3a6fc215551ec2e84c5127989333906ef";

@Injectable({
  providedIn: 'root'
})
export class PersoService {
  marvel_page : number = 0

  constructor(private http: HttpClient) { }

  private marvelHeaders() : any
  {
    
    var ts = String(Date.now());
    const headers = { 
      "apikey": MARVEL_PUB_KEY,
      "ts": ts,
      "hash": String(  Md5.hashStr(ts+MARVEL_PRIV_KEY+MARVEL_PUB_KEY) ), //Hash = md5 ( ts+privateKey+publicKey )
      "limit" : String(24),
      "offset" : String(this.marvel_page*24),
    };

    return headers;
  }
  
  getPersosMARVEL(): Array<Perso>{
    
    const headers=  this.marvelHeaders()
    console.log(headers);
    /*

    this.http.get("/marvel/v1/public/characters", { headers })
      .subscribe(response => { 
        //this.myData = response; 
        console.log(response);
      });
      */
     let persos : Array<Perso> = [];
     
     this.http.get("./assets/json_templates/characters.json").subscribe(response =>{
       let data = response["data"];
       let results = data["results"];
       console.log(results);

       results.forEach(hero => {

        if(hero["description"] || hero["thumbnail"]){
         persos.push({
            id : hero["id"],
            name: hero["name"],
            description: hero["description"],
            connections: [],
            abilities : [],
            origin : "Marvel",
            image : hero["thumbnail"]["path"] +"."+ hero["thumbnail"]["extension"],
            URI : hero["resourceURI"]
          });
        }
       });
    })

     return persos;
  }

  getPersoMARVEL(id : number) : Perso{
    /*
    const headers=  this.marvelHeaders()
    this.http.get(MARVEL_URL+"/v1/public/characters/"+id, { headers })
      .subscribe(response => { 
        //this.myData = response;
        console.log(response);
      });
  }
  */
    let perso : Perso;
    this.http.get("./assets/json_templates/characters.json").subscribe(response =>{
      console.log("here")
      let data = response["data"];
      let results = data["results"];
      let hero = results[0];

      perso =  {
        id : hero["id"],
        name: hero["name"],
        description: hero["description"],
        connections: [],
        abilities : [],
        origin : "Marvel",
        image : hero["thumbnail"]["path"] +"."+ hero["thumbnail"]["extension"],
        URI : hero["resourceURI"]
      };
      console.log("done : "+hero["name"])
    });
    return perso;
  }


}
