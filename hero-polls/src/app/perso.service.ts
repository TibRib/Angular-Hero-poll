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

const MOCKUP_DATA = true;

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

  //Creates an Instance of an empty Perso
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

  //Constructs a Perso with filled in fields
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

  //Returns the basic httpParameters required by marvel Dev's API
  marvelParameters() : HttpParams{
    let ts = String(Date.now());
    return new HttpParams() 
      .set('apikey', MARVEL_PUB_KEY)
      .set('ts', ts)
      .set('hash', String(  Md5.hashStr(ts+MARVEL_PRIV_KEY+MARVEL_PUB_KEY) ))
            //Hash = md5 ( ts+privateKey+publicKey )
  }

  //Returns the marvel httpParameter with some more parameters for navigation
  marvelPageParameters(page : number) : HttpParams{
    return this.marvelParameters()
      .set('limit',  String(this.pageLength))
      .set('offset',  String(page*this.pageLength));
  }

  //Returns an observable array of the marvel heroes in a page
  getPersosMARVEL(page : number): Observable<Array<Perso>>{
    return this.getPersosfromURIMARVEL("/v1/public/characters",true,page);
  }

  //Returns an observable array of the marvel heroes listed in the provided URI, with a limit of this.PageLength if required
  getPersosfromURIMARVEL(URI : string, asPage : boolean = false, pageId:number=0): Observable<Array<Perso>>{
    let urlGet ="";
    if(MOCKUP_DATA){
      urlGet = "./assets/json_templates/characters.json";
    }else{
      let formattedURI = URI.substring(URI.indexOf('/')-1)
      urlGet = MARVEL_URL+formattedURI;
    }

    //Get the paging specific parameters if asked as a parameter
    const params = asPage? this.marvelPageParameters(pageId) : this.marvelParameters();
    let persos :BehaviorSubject<Array<Perso>> = new BehaviorSubject<Array<Perso>>([]);
     //Launch the subscription of the http GET
     this.http.get(urlGet, {params}).subscribe(response =>{
       let data = response["data"];
       let results = data["results"];
        //For each character received under the marvel format
       let persosRecus: Array<Perso> = []
       results.forEach(hero => {
         //Push the character as an instance of the Perso class requirements
          persosRecus.push(
           this.createPersoWith( hero["id"], hero["name"],hero["description"],[],[],"Marvel",hero["thumbnail"]["path"] +"."+ hero["thumbnail"]["extension"],hero["resourceURI"])
           );
       });
       //Signal the update of the list
       persos.next(persosRecus);
    });

     return persos.asObservable();
  }

  //This function returns an observable array of heroes related to the one provided as a parameter
  getRelationsOfPersoMARVEL(idperso : number) : Observable<Array<Perso>> {
    let urlGet = "";
    if(MOCKUP_DATA){
      urlGet = "./assets/json_templates/characterstories.json";
    }else{
      urlGet = MARVEL_URL+"/v1/public/characters/"+idperso+"/stories";
    }
    const params = this.marvelParameters();
    //Relatives list as a behavior object
    let relations:BehaviorSubject<Array<Perso>> = new BehaviorSubject<Array<Perso>>([]);

    //Firstly, we get all the stories the hero is featured in
    this.http.get(urlGet, { params }).subscribe(response =>{
      let nb = response["data"]["count"]; //Here I display the number of known stories
      console.log(idperso + " is related to "+nb+" stories : ");
      //Here I get the array of stories the hero is related to
      let stories = response["data"]["results"];
      stories.forEach(story => {
        console.log(story["title"]); //Here I log the story's name
        //For each story, we can retrieve the list of related characters under a URI form
        let charactersListURI = story["characters"]["collectionURI"];
        //We then call a function that returns an observable list of heroes from the provided URI
        this.getPersosfromURIMARVEL(charactersListURI).subscribe( charactersInStory =>{
          //For each hero that appears in that list,
          charactersInStory.forEach(indiv => {
            //If the hero has not already been registered as a relation and is not the target,
            if( relations.value.some(x=>x["id"]===indiv["id"] ) === false && indiv["id"] !== idperso){
              console.log(indiv["name"]);
              relations.value.push(indiv); //Insert him in the relation's list
            }
          });
          
        })
        
      });
    });
    return relations.asObservable();
  }

  //Returns a single hero from the marvel API, as an Observable
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

      this.getRelationsOfPersoMARVEL(hero["id"]).subscribe(list => {
        perso.value.connections = list;
      });

    });

    return perso.asObservable();
  }

  //Returns True if the hero has both an original image and description
  //Used to make sure to return an interesting enough character.
  isExploitable(indiv : Perso){
    return (indiv.description.length>0 && ( indiv.image.length>0 && !indiv.image.endsWith("image_not_available.jpg")) )
  }

  //returns a randomized character that has a valid description and image
  //Will return the first hero in list that isExploitable*
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
