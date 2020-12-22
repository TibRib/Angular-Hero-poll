import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Perso } from '../perso';

@Component({
  selector: 'hp-hero-votable',
  template: `
    <!--Hero top section : image and name -->
    <section class="row " style=" height : 300px">        
        <div *ngIf="left" class="col-6" id="imgDiv" style="width: 100%; height : 100%;">
          <img src="{{perso.image}}" style="width: 100%; height : 100%; object-fit: cover; border-radius: 2em;">
        </div>
        <!-- Hero Name,Origin, Vote button -->
        <div class="col-6 align-self-center">
          <div class="d-flex align-items-start flex-column" style="height: 60%;">
            <div class="mb-auto p-2">
              <h2  [ngClass]="{'text-right': right }">{{perso.name}}</h2>
              <p  [ngClass]="{'text-right': right }">{{perso.origin}}</p>
            </div>
            <div class="p-2 btn-block">
            <button mdbBtn (click)="selectionPersonnage()" [ngClass]="{'btn-danger': left, 'btn-primary': right, 'float-right': right }" >Vote</button>
            </div>
          </div>
        </div>
        <div *ngIf="right" class="col-6" id="imgDiv" style="width: 100%; height : 100%;">
          <img src="{{perso.image}}" style="width: 100%; height : 100%; object-fit: cover; border-radius: 2em;">
        </div>
    </section>

    <!-- Hero bottom section : description, abilities -->
    <section class="row">
      <p class="mt-3" [ngClass]="{'text-right': right }">
      {{perso.description}}
      </p>
      <div class="p-2 btn-block">
        <a *ngIf="perso.id > 0" [ngClass]="{'float-right': right }" routerLink="/details/{{perso.origin}}/{{perso.id}}" class="btn btn-link" data-mdb-ripple-color="dark">see more</a>
      </div>
    </section>
  `,
  styles: [
  ]
})
export class HeroVotableComponent implements OnInit {
  @Input() perso : Perso;
  @Input() left : boolean;
  right : boolean=false;

  @Output() choisiEvent = new EventEmitter<Perso>();

  constructor() { 
  }

  ngOnInit(): void {
    this.right = !this.left;
  }

  selectionPersonnage(): void{
    this.choisiEvent.next(this.perso);
  }

}
