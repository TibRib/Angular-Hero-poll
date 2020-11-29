import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersoService {
  token : string = "MY_TOKEN"

  constructor(private http: HttpClient) { }

  
  getPersos(): void{
    const headers = { 
      Authorization: `Bearer ${this.token}`
    };

    this.http.get('http://url', { headers })
      // will call the URL http://url?sort=ascending&page=1
      .subscribe(response => { 
        //this.myData = response; 
        console.log(response);
      });
  }


}
