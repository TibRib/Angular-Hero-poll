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
              <h2>{{perso.name}}</h2>
              <p>{{perso.origin}}</p>
            </div>
            <div class="p-2">
            <button class="btn" (click)="selectionPersonnage()" [ngClass]="{'btn-danger': left, 'btn-primary': right }" >Vote</button>
            </div>
          </div>
        </div>
        <div *ngIf="right" class="col-6" id="imgDiv" style="width: 100%; height : 100%;">
          <img src="{{perso.image}}" style="width: 100%; height : 100%; object-fit: cover; border-radius: 2em;">
        </div>
    </section>

    <!-- Hero bottom section : description, abilities -->
    <section class="row">
      <p class="mt-3 text-left">
      {{perso.description}}
      </p>
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
