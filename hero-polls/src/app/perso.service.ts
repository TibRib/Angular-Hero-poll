import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';

/* MARVEL API 
  CALLS PER DAY : 3000
  URL : http://gateway.marvel.com/
  docs : https://developer.marvel.com/docs
  */

const MARVEL_URL = "http://gateway.marvel.com";
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
    var md5 = require('md5');
    var ts = String(Date.now());
    const headers = { 
      apikey: MARVEL_PUB_KEY,
      ts: ts,
      hash: String(md5(ts+MARVEL_PRIV_KEY+MARVEL_PUB_KEY)), //Hash = md5 ( ts+privateKey+publicKey )
      limit : String(24),
      offset : String(this.marvel_page*24),
    };

    return headers;
  }
  
  getPersosMARVEL(): void{
    const headers=  this.marvelHeaders()
    this.http.get(MARVEL_URL+"/v1/public/characters", { headers })
      .subscribe(response => { 
        //this.myData = response; 
        console.log(response);
      });
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
