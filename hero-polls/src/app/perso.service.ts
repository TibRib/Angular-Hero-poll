import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';

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
  
  getPersosMARVEL(): void{
    const headers=  this.marvelHeaders()
    console.log(headers);

    this.http.get("/marvel/v1/public/characters?apikey=d6e02dd7c891815142fcac32c5c10859&ts=1606846806128&hash=e7c9553d739815193473c401c344c9f6&limit=24&offset=0")
      .subscribe(response => { 
        //this.myData = response; 
        console.log(response);
      });
    /*
    this.http.get("/marvel/v1/public/characters", { headers })
      .subscribe(response => { 
        //this.myData = response; 
        console.log(response);
      });
      */
  }

  getPersoMARVEL(id : number){
    const headers=  this.marvelHeaders()
    this.http.get(MARVEL_URL+"/v1/public/characters/"+id, { headers })
      .subscribe(response => { 
        //this.myData = response;
        console.log(response);
      });
  }


}
