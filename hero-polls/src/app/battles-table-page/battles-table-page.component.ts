import { Component, OnInit } from '@angular/core';
import { Battle } from '../battle';
import { BattlesService } from '../battles.service';

/* Ce composant a pour objectif
 * d'afficher sous forme de tableau
 * les différents combats-sondages enregistrés
 * d'offrir un visuel net sur ceux-ci
 * et d'offrir un accès vers ceux-ci
 */

@Component({
  selector: 'hp-battles-table-page',
  template: `
    <table mdbTable striped="true" hover="true">
    <thead class="black white-text">
      <tr>
        <th *ngFor="let head of headers" scope="col">{{head}} </th>
      </tr>
    </thead>
    <tbody>
      <tr mdbTableCol *ngFor="let b of battles; let i = index">
        <th scope="row">{{i}}</th>
        <td class="col-9">{{b.name}}</td>
        <td class="col-2"><b class="text-center">{{b.participants[0].votes + b.participants[1].votes }}</b></td>
        <td class="col-1"> 
          <a routerLink="/versus/{{b.id}}" mdbBtn color="primary" mdbWavesEffect>Participate</a>
        </td>
      </tr>
    </tbody>
  </table>
  `,
  styles: [
  ]
})
export class BattlesTablePageComponent implements OnInit {
  headers = ["#", "Battle name","Votes", "Action" ] //Les entêtes du tableau du template
  battles :  Array<Battle>  //Ma future liste de combats-sondages enregistrés

  constructor(private battleService : BattlesService) { }

  ngOnInit(): void {
    this.fetchBattles();
  }

  /* Méthode de récupération des combats-sondages dans le serveur json */
  fetchBattles() : void{
    this.battleService.getBattles().subscribe(
      result => this.battles = result);
  }

}
