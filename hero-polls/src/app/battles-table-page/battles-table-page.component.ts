import { Component, OnInit } from '@angular/core';
import { Battle } from '../battle';
import { BattlesService } from '../battles.service';

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
  headers = ["#", "Battle name","Votes", "Action" ]
  battles :  Array<Battle>

  constructor(private battleService : BattlesService) { }

  ngOnInit(): void {
    this.fetchBattles();
  }

  fetchBattles() : void{
    this.battleService.getBattles().subscribe(
      result => this.battles = result);
  }

}
